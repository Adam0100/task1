const fs = require("fs");

function cleanHTML(filename, words) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error(`Ошибка при чтении файла: ${err}`);
      return;
    }

    const cleanedData = data.replace(/<(?!\/?(label|p)\b)[^>]*>/gi, "");

    const containsWords = (str) => {
      return words.some((word) => str.includes(word));
    };

    const result = cleanedData.replace(
      /<(label|p)[^>]*>.*?<\/\1>/gi,
      (match) => {
        const content = match.replace(/<\/?[^>]+(>|$)/g, "");
        return containsWords(content) ? "" : match;
      }
    );

    fs.writeFile(filename, result, (err) => {
      if (err) {
        console.error(`Ошибка при записи файла: ${err}`);
      } else {
        console.log(`Файл успешно обработан и сохранен: ${filename}`);
      }
    });
  });
}

const filename = "index.html";
const words = ["js", "use"];
cleanHTML(filename, words);
