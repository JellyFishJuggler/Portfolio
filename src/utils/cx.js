/**
 * Minimal className joiner. Local rather than a dependency: the only thing
 * needed is falsy-skipping and space joining.
 * @param {...(string|false|null|undefined)} parts
 * @returns {string}
 */
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default cx;
