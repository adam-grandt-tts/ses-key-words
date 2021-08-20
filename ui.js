const pct = new Intl.NumberFormat("en-US", { style: "percent" });

export const getValue = (selector) => document.querySelector(selector).value;

export const hide = (selector) =>
  (document.querySelector(selector).style.display = "none");

export const setContent = (selector, content) =>
  (document.querySelector(selector).innerHTML = content);

export const show = (selector) =>
  (document.querySelector(selector).style.display = "");

export function occurrences(string, subString, allowOverlapping){

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);
  
    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;
  
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
  }

export const getCategoryString = (category, has, total) => {
  var bg;
  if ((has / total) < 0.21) {bg = "bg-danger"
    }else if((has / total) < 0.41){bg = "bg-warning"
    }else if((has / total) < 0.61){bg = "bg-info"
    }else{bg = "bg-success"}

  return `
  <div class="row">
    <div class="col-12">
      <strong>${category}</strong>: has ${has} of ${total} words (${pct.format(has / total)})
    </div>
  </div>
  <div class="row">
    <div class="progress" style="height:30px; padding: 5px;">
      <div class="progress-bar progress-bar-striped ${bg}" role="progressbar" style="width: ${pct.format(has / total)}" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">${pct.format(has / total)}</div>
    </div>  
  </div>
  
`;
};
