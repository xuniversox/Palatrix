window.onload = function () {
  var PalatrixPanel = document.getElementById("Palatrix-Panel");
  PalatrixPanel.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );
  var root = document.documentElement;
  var ColorPicker = document.getElementById("ColorPicker");
  var ColorChoice = document.getElementById("ColorPicker").value;
  var ColorBox = document.getElementsByClassName("ColorBox");
  var RGB_Regex = /(\d+\s){2}\d+/s;
  var PNG_Size_Option_Selector = document.getElementById(
    "PNG_Size_Option_Selector"
  );

  PNG_Size_Option_Selector.style.display = "none";

  let ColorPicked = new Map([["ColorPicked", "#000000"]]);

  function RGB_Random() {
    var RGB =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";

    return RGB;
  }

  /*   function RGB_Hex(r, g, b) {
    var hex = ((r << 16) | (g << 8) | b).toString(16);
    return "#" + ("000000" + hex).slice(-6);
  } */

  function RGB_Hex(rgb) {
    var r = Number(rgb[0]).toString(16).padStart(2, "0");
    var g = Number(rgb[1]).toString(16).padStart(2, "0");
    var b = Number(rgb[2]).toString(16).padStart(2, "0");
    return r + g + b;
  }

  function RGB_BIN(rgb) {
    let binary = "";
    binary += rgb[0].toString(2).padStart(8, "0");
    binary += rgb[1].toString(2).padStart(8, "0");
    binary += rgb[2].toString(2).padStart(8, "0");
    return binary;
  }

  for (let i = 0; i < ColorBox.length; i++) {
    ColorBox[i].style.backgroundColor = RGB_Random();

    /* ColorBox[i].innerHTML =
      "<span class='ColorValue'>" +
      ColorBox[i].style.backgroundColor +
      "</span>"; */
    ColorBox[i].addEventListener("click", function () {
      console.log(i);
      ColorChoice = document.getElementById("ColorPicker").value;
      ColorBox[i].style.backgroundColor = ColorChoice;
      ColorPicked.set("ColorPicked" + i, ColorPicker.value);
      console.log(
        "This is ColorPicked = " + ColorPicked.get("ColorPicked" + i)
      );
    });

    ColorBox[i].addEventListener("contextmenu", function (event) {
      console.log(i);
      event.preventDefault();
      ColorPicker.value = ColorPicked.get("ColorPicked" + i);

      console.log(ColorBox[i].style.backgroundColor);
      console.log(
        "This is ColorPicked = " + ColorPicked.get("ColorPicked" + i)
      );
    });
  }

  //JASC-PAL

  document.addEventListener("keydown", function (event) {
    if (event.code == "Space") {
      const options = document.querySelectorAll(
        'input[name="palette-format-type"]'
      );
      let selectedOption;

      for (const option of options) {
        if (option.checked) {
          selectedOption = option.value;
        }
      }

      console.log(selectedOption);

      console.log("Pressed Space");
      if (selectedOption == "PNG") {
        var PalatrixPalette = document.getElementById("Palatrix-Palette");
        root.style.setProperty("--Grid-Row-Amount", 1);
        root.style.setProperty("--Grid-Column-Amount", 16);

        root.style.setProperty("--Palette-Width", "auto");
        root.style.setProperty("--Palette-Height", "auto");

        var PNG_Size_Option_Selector = document.getElementById(
          "PNG_Size_Option_Selector"
        );

        PNG_Size_Option_Selector.style.display = "block";

        var PNG_Size_Options = [
          { value: "1x1", label: "1x1" },
          { value: "8x8", label: "8x8" },
          { value: "32x32", label: "32x32" },
        ];

        if (PNG_Size_Option_Selector.childElementCount === 0) {
          PNG_Size_Options.forEach((option) => {
            var PNG_Option_Element = document.createElement("option");
            PNG_Option_Element.value = option.value;
            PNG_Option_Element.text = option.label;
            PNG_Size_Option_Selector.appendChild(PNG_Option_Element);
          });
        }

        if (PNG_Size_Option_Selector.value === "1x1") {
          root.style.setProperty("--ColorBox-Width", 1);
          root.style.setProperty("--ColorBox-Height", 1);
          console.log("1x1 option is selected.");
        } else {
          console.log("1x1 option is not selected.");
        }

        if (PNG_Size_Option_Selector.value === "8x8") {
          root.style.setProperty("--ColorBox-Width", 8);
          root.style.setProperty("--ColorBox-Height", 8);
          console.log("8x8 option is selected.");
        } else {
          console.log("8x8 option is not selected.");
        }

        if (PNG_Size_Option_Selector.value === "32x32") {
          root.style.setProperty("--ColorBox-Width", 32);
          root.style.setProperty("--ColorBox-Height", 32);
          console.log("32x32 option is selected.");
        } else {
          console.log("32x32 option is not selected.");
        }

        var PaletteImageViewer = document.getElementById(
          "Palette-Image-Viewer"
        );

        if (typeof htmlToImage !== "undefined") {
          // Call the toCanvas method
          htmlToImage
            .toCanvas(document.querySelector("#Palatrix-Palette"), {
              pixelRatio: 2,
            })
            .then(function (canvas) {
              // ...
            });
        }

        htmlToImage
          .toPng(document.getElementById("Palatrix-Palette"), {
            backgroundColor: null,
          })
          .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);

            // Download the PNG file
            download(dataUrl, "palette.png");
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
      }
      if (selectedOption == "PAL") {
        var PNG_Size_Option_Selector = document.getElementById(
          "PNG_Size_Option_Selector"
        );

        PNG_Size_Option_Selector.style.display = "none";

        root.style.setProperty("--Grid-Row-Amount", 2);
        root.style.setProperty("--Grid-Column-Amount", 8);
        root.style.setProperty("--ColorBox-Width", 100 + "%");
        root.style.setProperty("--ColorBox-Height", 100 + "%");
        root.style.setProperty("--Palette-Width", 100 + "%");
        root.style.setProperty("--Palette-Height", 100 + "%");

        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var i = 0;
        if (i == 0) {
          ColorFormat += "JASC-PAL" + "\n";
          ColorFormat += "0100" + "\n";
        }

        for (ColorNumber = 0; ColorNumber < ColorBoxes.length; ColorNumber++);

        ColorFormat += String(ColorNumber - 1) + "\n";

        for (i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);
          ColorFormat += RGBValue.join(" ") + "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.pal";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }

      //GIMP-PAL
      if (selectedOption == "GPL") {
        var PNG_Size_Option_Selector = document.getElementById(
          "PNG_Size_Option_Selector"
        );

        PNG_Size_Option_Selector.style.display = "none";
        root.style.setProperty("--Grid-Row-Amount", 2);
        root.style.setProperty("--Grid-Column-Amount", 8);
        root.style.setProperty("--ColorBox-Width", 100 + "%");
        root.style.setProperty("--ColorBox-Height", 100 + "%");
        root.style.setProperty("--Palette-Width", 100 + "%");
        root.style.setProperty("--Palette-Height", 100 + "%");

        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var PaletteName = "DEFAULT";
        var i = 0;
        if (i == 0) {
          ColorFormat += "GIMP Palette" + "\n";
          ColorFormat += "#Palette Name: " + PaletteName + "\n";
          ColorFormat += "#Description: " + PaletteName + "\n";
        }

        for (ColorNumber = 0; ColorNumber < ColorBoxes.length; ColorNumber++);

        ColorFormat += "#Colors: " + String(ColorNumber - 1) + "\n";

        for (i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);
          ColorFormat += RGBValue.join(" ");

          if (i % 1 == 0) {
            ColorFormat += " " + RGB_Hex(RGBValue);
          }
          ColorFormat += "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.gpl";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }
      //////END OF GIMP PAL

      //TXT-PAL
      if (selectedOption == "TXT") {
        var PNG_Size_Option_Selector = document.getElementById(
          "PNG_Size_Option_Selector"
        );

        PNG_Size_Option_Selector.style.display = "none";
        root.style.setProperty("--Grid-Row-Amount", 2);
        root.style.setProperty("--Grid-Column-Amount", 8);
        root.style.setProperty("--ColorBox-Width", 100 + "%");
        root.style.setProperty("--ColorBox-Height", 100 + "%");
        root.style.setProperty("--Palette-Width", 100 + "%");
        root.style.setProperty("--Palette-Height", 100 + "%");
        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var PaletteName = "DEFAULT";
        var i = 0;
        if (i == 0) {
          ColorFormat += ";paint.net Palette File" + "\n";
          ColorFormat += ";Downloaded from Palatrix" + "\n";
          ColorFormat += "#Palette Name: " + PaletteName + "\n";
          ColorFormat += "#Description: " + PaletteName + "\n";
        }

        for (ColorNumber = 0; ColorNumber < ColorBoxes.length; ColorNumber++);

        ColorFormat += "#Colors: " + String(ColorNumber - 1) + "\n";

        for (i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);

          if (i % 1 == 0) {
            ColorFormat += "FF" + RGB_Hex(RGBValue);
          }
          ColorFormat += "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.txt";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }
      //////END OF TXT PAL

      //HEX-PAL
      if (selectedOption == "HEX") {
        var PNG_Size_Option_Selector = document.getElementById(
          "PNG_Size_Option_Selector"
        );

        PNG_Size_Option_Selector.style.display = "none";
        root.style.setProperty("--Grid-Row-Amount", 2);
        root.style.setProperty("--Grid-Column-Amount", 8);
        root.style.setProperty("--ColorBox-Width", 100 + "%");
        root.style.setProperty("--ColorBox-Height", 100 + "%");
        root.style.setProperty("--Palette-Width", 100 + "%");
        root.style.setProperty("--Palette-Height", 100 + "%");
        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var PaletteName = "DEFAULT";

        for (var i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);

          if (i % 1 == 0) {
            ColorFormat += RGB_Hex(RGBValue);
          }
          ColorFormat += "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.hex";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }
      //////END OF HEX PAL

      //BIN-PAL
      if (selectedOption == "BIN") {
        var PNG_Size_Option_Selector = document.getElementById(
          "PNG_Size_Option_Selector"
        );

        PNG_Size_Option_Selector.style.display = "none";
        root.style.setProperty("--Grid-Row-Amount", 2);
        root.style.setProperty("--Grid-Column-Amount", 8);
        root.style.setProperty("--ColorBox-Width", 100 + "%");
        root.style.setProperty("--ColorBox-Height", 100 + "%");
        root.style.setProperty("--Palette-Width", 100 + "%");
        root.style.setProperty("--Palette-Height", 100 + "%");
        var ColorBoxes = document.querySelectorAll(".ColorBox");
        var ColorFormat = "";
        var ColorNumber = 0;
        var PaletteName = "DEFAULT";

        for (var i = 0; i < ColorBoxes.length; i++) {
          var ColorBox = ColorBoxes[i];
          var RGBValue = ColorBox.style.backgroundColor.match(/\d+/g);

          if (i % 1 == 0) {
            ColorFormat += RGB_BIN(RGBValue);
          }
          ColorFormat += "\n";
        }
        console.log(ColorFormat);
        var filename = "my-file.bin";
        var blob = new Blob([ColorFormat], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        console.log("Key pressed:", event.key);
      }
      //////END OF HEX PAL

      //END OF SPACE
    }
  });

  var imageContainer = document.getElementById("Palette-Selector");

  fetch("palette")
    .then((response) => response.text())
    .then((data) => {
      var parser = new DOMParser();
      var html = parser.parseFromString(data, "text/html");
      var links = Array.from(
        html.querySelectorAll(
          "a[href$='.jpg'], a[href$='.jpeg'], a[href$='.png'], a[href$='.gif']"
        )
      );
      links.forEach((link) => {
        console.log(link.textContent);
        var img = document.createElement("img");

        img.src = `palette/${link.textContent}`;
        console.log((img.src = `palette/${link.textContent}`));
        img.width = 200; // Set the width to 200 pixels
        img.height = 200; // Set the height to 200 pixels
        imageContainer.appendChild(img);
        console.log(img);
      });
    })
    .catch((error) => console.log(error));
};
