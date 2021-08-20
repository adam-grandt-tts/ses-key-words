import data from "./data.js";
import { getCategoryString, getValue, hide, setContent, show, occurrences } from "./ui.js";

const onChange = async () => {
  const text = getValue("textarea");

  const strs = [];
  const categories = {};
  var cloud_data = [];
  var missing_summery = [];



  Object.entries(await data).forEach(([category, words]) => {
    const info = {
      has: [],
      missing: [],
      total: words.length,
      counts : {},
    };

    words.forEach((word) => {    
      var count = occurrences(text.toLowerCase(),word.toLowerCase(), false );
      if ( count > 0 ){
        info.has.push(word);
        info.counts[word] = count
        if(category == "ECQ Summery"){
          cloud_data.push(
            {
              "x": word.toLowerCase(),
              value: count,
              "category": category
            }
          )
        }
      }else{
        info.missing.push(word);
        if(category == "ECQ Summery"){
          missing_summery.push(word)
        }
      }

    });

    categories[category] = info;
    strs.push(getCategoryString(category, info.has.length, info.total));
  });
  setContent("#info-panel", strs.join(""));

  var chart = anychart.tagCloud(cloud_data);
  // recreate container cause anychart has issues
  document.getElementById("cloud-panel").remove();
  var cloud_div = document.createElement("div");
  cloud_div.id = "cloud-panel"
  document.getElementById("cloud-container").appendChild(cloud_div);



  chart.angles([0])
  chart.container("cloud-panel");
  chart.colorRange().enabled(true);
  chart.draw();

  if (missing_summery.length < 348){
    document.getElementById("recommendation").innerHTML = 'Please consider using the following words in your documents to improve your proficiency levels:<br><ul><li>' + missing_summery.slice(0,10).join("</li><li>"); + '</li></ul>';
  }
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
