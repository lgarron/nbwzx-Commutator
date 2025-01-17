function commutator() {
  var locationud = new Array();
  var arrtemp;
  var x = String(document.getElementById("x").value);
  x = new globalThis.alg.Alg(x).expand().toString();
  if (x.indexOf("R") > -1 || x.indexOf("M") > -1) {
    x = x.replace(/r2/g, "R2 M2");
    x = x.replace(/r'/g, "R' M");
    x = x.replace(/r/g, "R M'");
  }
  if (x.indexOf("L") > -1 || x.indexOf("M") > -1) {
    x = x.replace(/l2/g, "L2 M2");
    x = x.replace(/l'/g, "L' M'");
    x = x.replace(/l/g, "L M");
  }
  if (x.indexOf("F") > -1 || x.indexOf("S") > -1) {
    x = x.replace(/f2/g, "F2 S2");
    x = x.replace(/f'/g, "F' S'");
    x = x.replace(/f/g, "F S");
  }
  if (x.indexOf("B") > -1 || x.indexOf("S") > -1) {
    x = x.replace(/b2/g, "B2 S2");
    x = x.replace(/b'/g, "B' S");
    x = x.replace(/b/g, "B S'");
  }
  if (x.indexOf("U") > -1 || x.indexOf("E") > -1) {
    x = x.replace(/u2/g, "U2 E2");
    x = x.replace(/u'/g, "U' E");
    x = x.replace(/u/g, "U E'");
  }
  if (x.indexOf("D") > -1 || x.indexOf("E") > -1) {
    x = x.replace(/d2/g, "D2 E2");
    x = x.replace(/d'/g, "D' E'");
    x = x.replace(/d/g, "D E");
  }
  arr1 = simplify(x.split(" "));
  count = 0;
  minscoreall = 10000;
  for (i = 0; i < arr1.length - 1; i++) {
    if (
      "UD DU UE EU DE ED RM MR RL LR LM ML FS SF FB BF SB BS"
        .toString()
        .indexOf(arr1[i][0].toString() + arr1[i + 1][0].toString()) > -1
    ) {
      locationud[count] = i;
      count = count + 1;
    }
  }
  if (count > 4) {
    document.getElementById("result1").innerHTML = "Time Out";
    document.getElementById("result2").innerHTML = "Time Out";
    return 0;
  }
  var number = Math.pow(2, count);
  text1 = "";
  for (i = 0; i <= number - 1; i++) {
    text = String(i.toString(2));
    arrex = arr1.concat();
    for (j = 0; j < text.length; j++) {
      if (text[text.length - 1 - j].toString() == "1".toString()) {
        arrex = swaparr(arrex, locationud[j], locationud[j] + 1);
      }
    }
    part3 = conjugate(arrex);
    arr2 = simplify(inverse(part3.concat()).concat(arrex, part3));

    arrtemp = arr2.concat();
    minscore = 1000;
    for (j = 0; j < arrtemp.length; j++) {
      if (j <= arrtemp.length / 2) {
        realscore = score(arrtemp) + j / 3; //penalty factor
      }
      if (j > arrtemp.length / 2) {
        realscore = score(arrtemp) + (2 * (arrtemp.length - j)) / 3; //penalty factor
      }
      // text1 = text1 + i.toString() + "?" + realscore + ","; //+"("+  arrtemp.toString()+")"+",";
      if (realscore < minscore) {
        minscore = realscore;
      }
      arrtemp = displace(arrtemp);
    }

    // text1 = text1 + minscore;
    if (minscore < minscoreall) {
      minarr = arrex;
      minscoreall = minscore;
    }
  }
  commutatormain(minarr);
  // document.getElementById("result1").innerHTML = text1;
}

function commutatormain(array) {
  // var x = String(document.getElementById("x").value);
  var i;
  var j;
  var k;
  var flag;
  var arrtemp;
  var arr1;
  var mini;
  var minscore;
  var part1;
  var part2;
  var part3;
  var part4;
  var part5;
  var len;
  var len1;
  var len2;
  arr1 = array.concat(); //simplify(x.split(" "));
  part3 = conjugate(arr1);
  arr1 = simplify(inverse(part3.concat()).concat(arr1, part3));
  arr2 = inverse(arr1.concat());
  flag = 0;
  text1 = "";
  minscore = 1000;
  arrtemp = arr1.concat();
  for (i = 0; i < arrtemp.length; i++) {
    if (i <= arrtemp.length / 2) {
      realscore = score(arrtemp) + i / 3; //penalty factor
    }
    if (i > arrtemp.length / 2) {
      realscore = score(arrtemp) + (2 * (arrtemp.length - i)) / 3; //penalty factor
    }
    // text1 = text1 + i.toString() + "?" + realscore + ","; //+"("+  arrtemp.toString()+")"+",";
    if (realscore < minscore) {
      mini = i;
      minscore = realscore;
    }
    arrtemp = displace(arrtemp);
  }
  if (mini <= arrtemp.length / 2) {
    part4 = arr1.concat().slice(0, mini);
    arr1 = simplify(inverse(part4.concat()).concat(arr1, part4));
  } else {
    part4 = arr1.concat().slice(mini, arrtemp.length);
    arr1 = simplify(part4.concat().concat(arr1, inverse(part4)));
  }
  arr2 = inverse(arr1.concat());
  part5 = simplify(part3.concat(part4));
  part5_out = simplifyfinal(part5);
  for (i = 0; i <= arr1.length; i++) {
    str1 = arr1.concat().slice(0, i);
    for (k = 0; k <= i; k++) {
      j = conjugate(arr1.concat().slice(i, arr1.length)).length;
      str2 = arr1.concat().slice(i, i + j);
      str3 = arr1.concat().slice(i - k, i);
      part1x = simplify(str1);
      part2x = simplify(str2.concat(str3));
      part1y = simplify(part1x.concat(inverse(part2x.concat())));
      part2y = simplify(part2x.concat(inverse(part1x.concat())));
      part1 = part1x;
      part2 = part2x;
      len = part1x.length + part2x.length;
      len1 = part1y.length + part2x.length;
      len2 = part1x.length + part2y.length;
      if (len1 < len2 && len1 < len) {
        part1 = part1y;
        part2 = part2x;
      } // For U R' F R2 D' R' D R' F' R U' D' R D R', output [U R' F R,R D' R' D] instead of [U R' F R2 D' R' D,R D' R' D]
      // The second one is better.
      if (len2 <= len1 && len2 < len) {
        part1 = part1y;
        part2 = part2x;
      }
      // text1=part1
      // text2=part2
      arrex = part1.concat(
        part2,
        inverse(part1.concat()),
        inverse(part2.concat())
      );
      arr = simplify(arrex);
      part1_out = simplifyfinal(part1);
      part2_out = simplifyfinal(part2);
      if (arr.toString() == arr1.toString()) {
        if (part5.length == 0) {
          text1 = "[" + part1_out + ", " + part2_out + "]";
        }
        if (part5.length > 0) {
          text1 = "[" + part5_out + ": [" + part1_out + ", " + part2_out + "]]";
        }
        text2 =
          "[t,i,j,k]=[" +
          part5.length.toString() +
          "," +
          i.toString() +
          "," +
          j.toString() +
          "," +
          k.toString() +
          "]";
        flag = 1;
        break;
      }
    }
    if (flag == 1) {
      break;
    }
  }

  if (flag == 0) {
    text1 = "Not found.";
    text2 = "Not found.";
  }
  document.getElementById("result1").textContent = text1;
  document.getElementById("result2").textContent = text2;

  document.querySelector("#original").alg = document.querySelector("#x").value;
  document.querySelector(
    "#move-count-original"
  ).textContent = `${globalThis.notation.experimentalCountMoves(
    new globalThis.alg.Alg(document.querySelector("#x").value)
  )} moves`;

  document.querySelector("#structured").alg = text1;
  document.querySelector(
    "#move-count-structured"
  ).textContent = `${globalThis.notation.experimentalCountMoves(
    new globalThis.alg.Alg(text1)
  )} moves`;
}

// R2 D R U' R D' R' U R D R' U R' D' R U' R
function displace(array) {
  var arrtemp;
  var arr;
  var arr1;
  var arr2;
  arr = array.concat();
  arr1 = arr.concat().slice(0, 1);
  arr2 = arr.concat().slice(arr.length - 1, arr.length);
  if (combine_str(arr1[0], arr2[0]).toString() == "0".toString()) {
    arrtemp = arr.concat();
    arrtemp = inverse(arr1.concat()).concat(arrtemp, arr1);
    arrtemp = simplify(arrtemp);
  } else {
    arrtemp = arr.concat();
    arrtemp = arr2.concat(arrtemp, inverse(arr2.concat()));
    arrtemp = simplify(arrtemp);
  }
  return arrtemp;
}

function score(array) {
  var i;
  var j;
  var k;
  var arr1;
  var str1;
  var str2;
  var str3;
  var part1;
  var part2;
  var part1x;
  var part1y;
  var part2x;
  var part2y;
  var arr;
  var arrex;
  arr1 = array.concat();
  arr2 = inverse(arr1.concat());
  flag = 0;
  for (i = 0; i <= arr1.length; i++) {
    str1 = arr1.concat().slice(0, i);
    for (k = 0; k <= i; k++) {
      j = conjugate(arr1.concat().slice(i, arr1.length)).length;
      str2 = arr1.concat().slice(i, i + j);
      str3 = arr1.concat().slice(i - k, i);
      part1x = simplify(str1);
      part2x = simplify(str2.concat(str3));
      part1y = simplify(part1x.concat(inverse(part2x.concat())));
      part2y = simplify(part2x.concat(inverse(part1x.concat())));
      part1 = part1x;
      part2 = part2x;
      len = part1x.length + part2x.length;
      len1 = part1y.length + part2x.length;
      len2 = part1x.length + part2y.length;
      if (len1 < len2 && len1 < len) {
        part1 = part1y;
        part2 = part2x;
      }
      // The second one is better.
      if (len2 <= len1 && len2 < len) {
        part1 = part1y;
        part2 = part2x;
      }
      arrex = part1.concat(
        part2,
        inverse(part1.concat()),
        inverse(part2.concat())
      );
      arr = simplify(arrex);
      if (arr.toString() == arr1.toString()) {
        if (part1.length < part2.length) {
          return 2 * part1.length + part2.length;
        } else {
          return part1.length + 2 * part2.length;
        }
      }
    }
  }
  return 1000;
}

function conjugate(array) {
  var arr;
  var i;
  var arr1;
  var arr2;
  var len;
  var arrtemp;
  var t;
  var minlen;
  arr = array.concat();
  minlen = arr.length;
  t = 0;
  for (i = 1; i < array.length; i++) {
    arr1 = arr.concat().slice(0, i);
    arr2 = inverse(arr1.concat());
    arrtemp = arr.concat();
    arrtemp = arr2.concat(arrtemp, arr1);
    arrtemp = simplify(arrtemp);
    len = simplify(arrtemp).length;
    if (len < minlen) {
      t = i;
      minlen = len;
    }
  }
  if (t > 0) {
    if (arr[t - 1].length > 1) {
      if (arr[t - 1][1].toString() == "2".toString()) {
        return simplify(
          arr
            .concat()
            .slice(0, t - 1)
            .concat(
              inverse(arr.concat().slice(arr.length - t, arr.length - (t - 1)))
            )
        );
      }
    }
  } //For  R' U2 R' D R U R' D' R U R, output R' U':[U',R' D R] instead of R' U2:[R' D R,U]
  return arr.concat().slice(0, t);
}

function inverse(array) {
  var temp;
  var arr;
  var i;
  arr = array.concat();
  for (i = 0; i < arr.length / 2; i++) {
    temp = arr[i];
    arr[i] = array[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  for (i = 0; i < arr.length; i++) {
    arr[i] = inverse_str(arr[i]);
  }
  return arr;
}

function simplifyfinal(array) {
  var arr;
  var arr_out;
  var i;
  arr = array.concat();
  arr = simplify(arr);
  for (i = 0; i < arr.length - 1; i++) {
    if (
      arr[i][0].toString() == "D".toString() &&
      arr[i + 1][0].toString() == "U".toString()
    ) {
      arr = swaparr(arr, i, i + 1);
    }
    if (
      arr[i][0].toString() == "B".toString() &&
      arr[i + 1][0].toString() == "F".toString()
    ) {
      arr = swaparr(arr, i, i + 1);
    }
    if (
      arr[i][0].toString() == "L".toString() &&
      arr[i + 1][0].toString() == "R".toString()
    ) {
      arr = swaparr(arr, i, i + 1);
    }
  }
  arr_out = arr.join(" ") + " ";
  arr_out = arr_out.replace(/R2 M2 /g, "r2 ");
  arr_out = arr_out.replace(/R' M /g, "r' ");
  arr_out = arr_out.replace(/R M' /g, "r ");
  arr_out = arr_out.replace(/L2 M2 /g, "l2 ");
  arr_out = arr_out.replace(/L' M' /g, "l' ");
  arr_out = arr_out.replace(/L M /g, "l ");
  arr_out = arr_out.replace(/F2 S2 /g, "f2 ");
  arr_out = arr_out.replace(/F' S' /g, "f' ");
  arr_out = arr_out.replace(/F S /g, "f ");
  arr_out = arr_out.replace(/B2 S2 /g, "b2 ");
  arr_out = arr_out.replace(/B' S /g, "b' ");
  arr_out = arr_out.replace(/B S' /g, "b ");
  arr_out = arr_out.replace(/U2 E2 /g, "u2 ");
  arr_out = arr_out.replace(/U' E /g, "u' ");
  arr_out = arr_out.replace(/U E' /g, "u ");
  arr_out = arr_out.replace(/D2 E2 /g, "d2 ");
  arr_out = arr_out.replace(/D' E' /g, "d' ");
  arr_out = arr_out.replace(/D E /g, "d ");

  arr_out = arr_out.replace(/M2 R2 /g, "r2 ");
  arr_out = arr_out.replace(/M R' /g, "r' ");
  arr_out = arr_out.replace(/M' R /g, "r ");
  arr_out = arr_out.replace(/M2 L2 /g, "l2 ");
  arr_out = arr_out.replace(/M' L' /g, "l' ");
  arr_out = arr_out.replace(/M L /g, "l ");
  arr_out = arr_out.replace(/S2 F2 /g, "f2 ");
  arr_out = arr_out.replace(/S' F' /g, "f' ");
  arr_out = arr_out.replace(/S F /g, "f ");
  arr_out = arr_out.replace(/S2 B2 /g, "b2 ");
  arr_out = arr_out.replace(/S B' /g, "b' ");
  arr_out = arr_out.replace(/S' B /g, "b ");
  arr_out = arr_out.replace(/E2 U2 /g, "u2 ");
  arr_out = arr_out.replace(/E U' /g, "u' ");
  arr_out = arr_out.replace(/E' U /g, "u ");
  arr_out = arr_out.replace(/E2 D2 /g, "d2 ");
  arr_out = arr_out.replace(/E' D' /g, "d' ");
  arr_out = arr_out.replace(/E D /g, "d ");

  arr_out = arr_out.replace(/R M2 /g, "r M' ");
  arr_out = arr_out.replace(/R' M2 /g, "r' M ");
  arr_out = arr_out.replace(/M2 R /g, "r M' ");
  arr_out = arr_out.replace(/M2 R' /g, "r' M ");
  arr_out = arr_out.substring(0, arr_out.length - 1);
  return arr_out;
}

function simplify(array) {
  var arr;
  var i;
  var len;
  len = array.length;
  arr = array.concat();
  for (i = 0; i <= len; i++) {
    arr = simple(arr);
  }
  return arr;
}

function simple(array) {
  var arr;
  var i;
  arr = array.concat();
  for (i = 0; i < arr.length - 1; i++) {
    if (combine_str(arr[i], arr[i + 1]).toString() == "".toString()) {
      arr.splice(i, 2);
      break;
    }
    if (combine_str(arr[i], arr[i + 1]).toString() == arr[i][0].toString()) {
      arr.splice(i + 2, 0, arr[i][0]);
      arr.splice(i, 2);
      break;
    }
    if (
      combine_str(arr[i], arr[i + 1]).toString() == (arr[i][0] + "2").toString()
    ) {
      arr.splice(i + 2, 0, arr[i][0] + "2");
      arr.splice(i, 2);
      break;
    }
    if (
      combine_str(arr[i], arr[i + 1]).toString() == (arr[i][0] + "'").toString()
    ) {
      arr.splice(i + 2, 0, arr[i][0] + "'");
      arr.splice(i, 2);
      break;
    }
  }
  return arr;
}

function combine_str(str1, str2) {
  var len1;
  var len2;
  len1 = str1.length;
  len2 = str2.length;
  if (str1[0] == str2[0]) {
    if (len1 == 1) {
      if (len2 == 1) {
        return str1 + "2";
      }
      if (len2 == 2) {
        if (str2[1] == "2") {
          return str1 + "'";
        }
        if (str2[1] == "'") {
          return "";
        }
      }
    }
    if (len1 == 2) {
      if (str1[1] == "'") {
        if (len2 == 1) {
          return "";
        }
        if (len2 == 2) {
          if (str2[1] == "2") {
            return str1[0];
          }
          if (str2[1] == "'") {
            return str1[0] + "2";
          }
        }
      }
      if (str1[1] == "2") {
        if (len2 == 1) {
          return str1[0] + "'";
        }
        if (len2 == 2) {
          if (str2[1] == "2") {
            return "";
          }
          if (str2[1] == "'") {
            return str1[0];
          }
        }
      }
    }
  }
  return "0";
}

function inverse_str(str) {
  var len;
  len = str.length;
  if (len == 1) {
    return str + "'";
  }
  if (len == 2) {
    if (str[1] == "2") {
      return str;
    }
    if (str[1] == "'") {
      return str[0];
    }
  }
}

function swaparr(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

document.getElementById("go").addEventListener("click", commutator);
document.getElementById("x").addEventListener("input", commutator);
document.getElementById("x").addEventListener("change", commutator);

document.querySelector("#try-it").addEventListener("click", () => {
  document.getElementById("x").value = "U R S R' S' U2 R' S R S' U";
  commutator();
});
