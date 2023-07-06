# Fallout Quiz
_A Fallout-based quiz game_

This is a JS-based browser game that my long-distance girlfriend and I can play together when we are apart. 

## The user experience
On the start screen, the players are met with an option to write a shuffle code to generate a unique game each time they play with a new code, or to generate the same order of questions when playing together.

## Methodology
### The questions
To ensure that neither of us gets an unfair advantage, none of us has found or made the quiz questions; rather, we have used API calls to openAI's GPT to generate the questions. The prompts used for the GPT include information scraped from pages on the [Fallout wiki](https://fallout.fandom.com/wiki/Fallout_Wiki). The pages are of characters, locations, factions, weapons, and lore from the Fallout game series that we have encountered together.
### The shuffle
The shuffle algorithm used in this game is the Fisher-Yates Shuffle algorithm based on a hash function and random number generator. This algorithm ensures that the questions are randomly shuffled each time the game is played, creating a unique experience for the players, while also allowing them to generate the same order of questions when playing together by using a specific code.

1. I use the shuffle code as input for a hash function. This way, a little change in the code, will create a completely different shuffle.
2. Next, I utilize this generated hash as a seed for a random number generator, which produces pseudo-random numbers.
3. Finally, these generated numbers are used in implementing the Fisher-Yates shuffle algorithm to rearrange the order of questions.
