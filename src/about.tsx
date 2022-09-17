import React from "react";
import ReactDOM from "react-dom/client";
import MarkdownRender from "./components/MarkdownRender";

import "./index.css";
import { Navbar } from "./Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));

const text = `
# About

Diablo 2 is a slot machine dressed up as a demon-slaying action game. My goal with Dropdash was to build a visual dashboard that showcases some of the loot generation mechanics in an educational way.

These were some of my favorite graphs to generate:

- the surprising ways set and unique chance scale with Magic Find for bosses
![Boss Magic Find](/magic_find_boss.PNG)
- the drop rates of high runes from Hell Diablo, illustrating how Jah has a higher drop rate than Ber
![High Runes](/rune_drop_chance.PNG)
- SoJ rarity from Nightmare Andariel with a [Sankey diagram](https://en.wikipedia.org/wiki/Sankey_diagram)
![SoJ Rarity](/sankey_soj.PNG)
- the relative rarities of weapon and armor treasure classes
![Phase Blade TCs](/tc_stacked.PNG)
- how the Countess's rune drop rate *decreases* with player count
![Countess Ist Rune Chance](/ist_countess.PNG)
- last but not least, how many town portal scrolls Duriel can drop in a single run
![Duriel Town Portal Chance](/duriel_tsc.PNG)

To my knowledge, this is the only D2R drop calculator to track full probability distributions, not just drop chance! If you know of another one, please let me know! 

## Tech Stack

This calculator runs entirely client-side, and is built with:
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ChartsJS](https://www.chartjs.org/)
- [blizzhackers/d2data](https://github.com/blizzhackers/d2data)

The source code is hosted at [https://github.com/yqlu/d2r-dropplot](https://github.com/yqlu/d2r-dropplot). Say hi to me on Github or at yqlu#2645 on Discord!

## The underlying math
### Chance vs Expectation

For monsters that drop more than one item, the calculator makes a key simplification -- it calculates *expected value* but presents it as a *drop chance*.

![Probability Table](/prob_table.PNG)

Suppose you have a monster that has 2 picks, but each roll of the dice only has a 0.2 chance of actually dropping an item.

Then you have...
- 0.8 * 0.8 = 0.64 chance to get nothing
- 2 * 0.8 * 0.2 = 0.32 chance of 1 drop
- 0.2 * 0.2 = 0.04 chance of 2 drops

You could say you had a 0.32 + 0.04 = 0.36 chance of *at least* 1 item dropping, but the calculator presents an expected drop rate of 1 * 0.32 + 2 * 0.04 = 0.4.

In practice, since most items have a rare drop rate (< 0.01), the higher order terms are negligible, and the two calculations differ only very slightly. The greatest disparity exists for common drops like gold, where the expected drop rate can exceed 1.

### Probability Distributions

Rendering the "Chance to drop x copies of __ over __ runs" graph required a surprising amount of work under the hood. The calculator keeps track of the full underlying probability distribution, not just expected value.

![NormalCountess Tal Rune Chance](/countess_tal_rune.PNG)

This is made possible with a cool math trick, [probability generating functions](https://en.wikipedia.org/wiki/Probability-generating_function).

#### Single pick

The simplest case is when a monster has a $p$ chance of dropping the target item (a "success") and a $q = 1-p$ chance otherwise (a "failure"). This is known as a [Bernoulli trial](https://en.wikipedia.org/wiki/Bernoulli_trial) and can represented as the binomial $q + px$.

#### Positive picks

Consider Council members with picks = 3. If the chance per pick of yielding the target item is $p$, then when we roll the dice 3 times, the probabiliy of getting $n$ copies of the target evaluates to the coefficient of $x^n$ in $(q + px)^5$. You may recognize this as a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution)! The polynomial doesn't mean anything in an algebraic sense; the power series just ends up being a convenient way to track coefficients.

#### Negative picks

\`Act 1 Champ A\` drops exactly once from \`Act 1 Citem A\` and once from \`Act 1 Cpot A\`. The combined chance of dropping $n$ copies of an item corresponds to the coefficient of $x^n$ when the two sub PGFs are multiplied together.

#### Act bosses with 7 picks

Diablo has 7 picks (each with non-zero nodrop), but drops a max of 6 items.

Without the 6 item cap, as before, the PGF is represented as $(q + px)^7$.

With the 6 item cap, we have to subtract the 7th drop if the previous 6 picks all dropped items. Call $q = q_n + q_y$ where $q_n$ is the chance of nodrop while $q_y$ is the chance of dropping some item not the target. Then $(q_y + px)^6$ describes the probability of the first 6 picks all dropping items as a distribution in terms of the target.

The adjusted PGF is thus

$$
(q + px)^7 + (q_y + px)^6 (p - px).
$$

#### The Countess

The Countess first attempts 5 picks in the Countess Item TC before attempting 3 picks from the Countess Rune TC, capped again at 6 drops total.

Call the chance of dropping a target rune in Countess Rune $p$, and decompose $q = 1 - p$ into $q_n$ and $q_y$ as before. The naive PGF is $(q + px)^3$, but we need to do some casework to adjust this down depending on what happened upstream in Countess Item. Call the probability of dropping any item in a single pick of Countess Item $p_i$.

##### Case 1: Countess Item yielded 5 drops

Upstream chance $c_5 = p_i ^ 5$

Use O to represent nodrop, X to represent a target drop, x to represent any drop, and ? to represent all possibilities. Then there are 3 (not mutually exclusive) cases where a target drop would be culled by the 6 drop maximum.

xX? yields $(q_y + px)(p-px)(q + px)$\  
x?X yields $(q_y + px)(q + px)(p-px)$\  
OxX yelds $q_n(q_y + px)(p - px)$

These three expressions add up and simplify to:

$$
(q_y + px)(2q + q_n + 2px)(p - px)
$$

Observe that the $p-px$ term (shifting the relevant probabilities down one degree in the power series) guarantees that a normalized PGF remains normalized (coefficients sum to 1) when this adjustment is added.

##### Case 2: Countess Item yielded 4 drops

Upstream chance $c_4 = 5 * (p_i) ^ 4 * (1 - p_i)$

The only case when a target drop would be culled by the 6 drop maximum is when there are two drops before it. We use the same symbols as before:

xxX yields $(q_y + px)^2(p - px)$

The final adjusted PGF becomes

$$
(q + px)^3 + c_5 (q_y + px)(2q + q_n + 2px)(p - px) + c_4 (q_y + px)^2(p - px)
$$

#### Duriel

Duriel is a unique TC because it has multiple picks of \`tsc\` (Scroll of Town Portal) and Duriel Base, which itself can drop multiple items. Instead of attempting to derive a closed-form solution, I followed the excellent analysis by [youbetterdont](https://youbetterdont.github.io/) to model this as a 28-state Markov chain.

From the resulting state vector, we can recover a PGF for \`tsc\`, and a separate one for Item. From here, calculate the probability of a drop from Duriel Base (assuming nodrop = 0) rolling as the target to be $p$, and substitute in $x = (q + px')$ into the generic Item PGF in $x$ to recover the target PGF in $x'$.

### Approximations

Binomial distributions can be expensive to compute as the number of runs exceeds the thousands! When appropriate, the calculator falls back to a cheaper [Poisson](https://en.wikipedia.org/wiki/Binomial_distribution#Poisson_approximation) or [normal approximation](https://en.wikipedia.org/wiki/Binomial_distribution#Normal_approximation) as appropriate.

This comparison shows the approximation quality during development.

![Approximation](/approx.PNG)

## Credits

Shoutout to:
- [Nishimura-Katsuo](https://github.com/Nishimura-Katsuo) for many conversations about game mechanics. Check out his own drop calculator at [blizzhackers.dev](https://blizzhackers.dev/#/dropfinder/)
- [Realmonster's D2 drop calculator](https://github.com/realmonster/diablo2_drop_calc), which I heavily relied on to validate accuracy
- [Diablo 2 Drop Calculations by youbetterdont](https://youbetterdont.github.io/)
- [Maxroll.gg's drop calculator](https://d2.maxroll.gg/d2-drop-calculator), which provided a lot of UI inspiration
- [Diablo Wiki's Item Generation Tutorial](https://diablo2.diablowiki.net/Item_Generation_Tutorial)

Other drop calculators that came before me:
- [Silospen's Dropcalc](https://dropcalc.silospen.com/item.php)
- [ATMA](http://atma.incgamers.com/)
- [Drop-Calculator by Tub](http://mfb.bplaced.net/dropcalc/index.php#en)
- [DropCalc by RainingChain](https://scripterswar.com/diablo2/DropCalc)
`;

root.render(
  <div className="text-gray-200 ">
    <Navbar></Navbar>
    <div className="py-12 flex items-center justify-center">
      <div className="container p-8 sm:p-0 sm:pt-8 prose prose-sm md:prose-base prose-invert prose-a:text-magic">
        <MarkdownRender children={text}></MarkdownRender>
      </div>
    </div>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
