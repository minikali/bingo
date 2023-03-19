/**
 * Creates an array containing numbers from 1 up to a given maximum value.
 *
 * @param {number} max - The maximum number to be included in the array.
 * @returns {number[]} An array containing numbers from 1 to the given maximum value.
 */
const createArray = (max: number) =>
  Array.from({ length: max }, (_, i) => i + 1);

/**
 * Shuffles the elements of a given array using the Fisher-Yates algorithm.
 *
 * @param {number[]} array - The array of numbers to be shuffled.
 * @returns {number[]} A shuffled array with the same elements as the input array.
 */
const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Creates a shuffled array of numbers from 1 to the specified maximum value.
 *
 * @param {number} max - The maximum value in the array (inclusive).
 * @returns {number[]} An array of shuffled numbers from 1 to max.
 */
const createShuffledArray = (max: number) => shuffleArray(createArray(max));

export default createShuffledArray;
