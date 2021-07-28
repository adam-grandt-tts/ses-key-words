import data from "./data.js";
import { getCategoryString, getValue, hide, setContent, show } from "./ui.js";

const onChange = async () => {
  const text = getValue("textarea");

  const strs = [];
  const categories = {};

  Object.entries(await data).forEach(([category, words]) => {
    const info = {
      has: [],
      missing: [],
      total: words.length,
    };

    words.forEach((word) => {
      if (text.toLowerCase().includes(word.toLowerCase())) {
        info.has.push(word);
      } else {
        info.missing.push(word);
      }
    });

    categories[category] = info;
    strs.push(getCategoryString(category, info.has.length, info.total));
  });

  setContent("#info-panel", strs.join(""));
};

const main = async () => {
  hide("textarea");
  hide("#info-panel");

  await data;
  show("textarea");
  show("#info-panel");
  document.querySelector("textarea").addEventListener("input", onChange);
  onChange();
};

document.addEventListener("DOMContentLoaded", main);
