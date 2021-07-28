const pct = new Intl.NumberFormat("en-US", { style: "percent" });

export const getValue = (selector) => document.querySelector(selector).value;

export const hide = (selector) =>
  (document.querySelector(selector).style.display = "none");

export const setContent = (selector, content) =>
  (document.querySelector(selector).innerHTML = content);

export const show = (selector) =>
  (document.querySelector(selector).style.display = "");

export const getCategoryString = (category, has, total) => {
  return `
<p>
  <strong>${category}</strong>:
  has ${has} of ${total} words
  (${pct.format(has / total)})
</p>`;
};
