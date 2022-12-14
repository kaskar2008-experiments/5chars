(function () {
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const words = ["АТЛЕТ","АРМЯК","АЛЬНО","АВГИТ","АВОСЬ","АВРАЛ","БАКЛЯ","БОЛИД","БЕЛЬЁ","БАХЧА","БУСЕЛ","БОСКО","БУХТА","БАЛДА","ВЗЪЕМ","ВЁДРО","ВЕШКА","ВАЗОН","ВКУПЕ","ВЕЖДА","ВОХРА","ВДОЛЬ","ВПРОК","ВОЛХА","ГОРШЕ","ГРОНА","ГЫЧКА","ГИДРА","ГЛИВА","ГЛУЗД","ГЕРОЙ","ГУМНО","ГЕВАН","ГАНУС","ДЫШЛО","ДЫЛДА","ДУБАС","ДРАЛО","ДБАТЬ","ДРИЛЬ","ДЕБИЛ","ДАЛЕЕ","ДУРАК","ДРУЗА","ЕЙНЫЙ","ЕТМАН","ЕГОЗА","ЕЛБАН","ЕЗУИТ","ЕЗДКА","ЕЛЕНЬ","ЕЖЕЛИ","ЕРЛЫК","ЁРНИК","ЖУПЕЛ","ЖЕРДЬ","ЖАЛОН","ЖОКЕЙ","ЖУЛИК","ЖЕРЛО","ЖИТИЕ","ЖНИЦА","ЖУПАН","ЖАТВА","ЗУРНА","ЗАЧИН","ЗЕЯТЬ","ЗАРОК","ЗЫБКА","ЗАВУЧ","ЗАВОД","ЗНАМЯ","ЗУВЕЙ","ЗАСПА","ИНУДА","ИЗВНЕ","ИНТЕР","ИСЛАМ","ИНДУС","ИМПЕТ","ИСПОД","ИХНИЙ","ИЗМОР","ИСХОД","КЛУША","КОЛЫМ","КАПСЯ","КОТЯК","КОЧЕТ","КАМСА","КУКЛА","КАЛДА","КАЙМА","КУТЁЖ","ЛОБОК","ЛИЦЕЙ","ЛЮТИК","ЛИТЕР","ЛУКНО","ЛОББИ","ЛЮТЫЙ","ЛОБАЗ","ЛАБАЗ","ЛАХМЫ","МОМОН","МРАЗЬ","МАКЕШ","МЕРИН","МЕТЕО","МЫЧКА","МОТКА","МЕРЕН","МУРКА","МЕСТО","НОРОТ","НАЯДА","НАРОК","НОРКА","НИКТО","НАЗАД","НЫНЧЕ","НЕФТЕ","НАВЕС","НЮАНС","ОРГИЯ","ОКОЛО","ОЗИМЬ","ОЧЕСА","ОТЕТЬ","ОКРОП","ОЗЕМЬ","ОТЗЫВ","ОБЛИК","ОЧЕНЬ","ПОЧИН","ПАСИК","ПАНЕР","ПАХВА","ПОТКА","ПРЯДЬ","ПЛАХА","ПОЖНЯ","ПЕКУС","ПРАЦА","РЕЗОН","РЕЖКА","РЕЯТЬ","РАТАЙ","РОПАК","РОГАЧ","РЁВКА","РЕТРО","РУКОП","РАНЕЦ","СОЛПА","СЛИХА","СУРПА","САЙВА","СРЯЩА","СУЗИК","СТРАМ","СИЗЫЙ","СИДОР","СЦЕНА","ТЕСКА","ТРОХА","ТЮХТЯ","ТВИРЬ","ТАНИК","ТРОЕК","ТУПЯК","ТЕРМО","ТЮПКА","ТЕЗКА","УСЛОН","УМОРА","УГЛАН","УПРЁК","УТЕХА","УХВАТ","УШЛЫЙ","УДИЛО","УЗРОК","УДАЛЬ","ФОРУМ","ФОРТЕ","ФРАЗА","ФАЛДА","ФОМКА","ФЕТИШ","ФАКИР","ФЕРЗЬ","ФАЙКА","ФЛЕШЬ","ХАПКА","ХАНЖА","ХАЙКА","ХЛЫСТ","ХОЛОП","ХАЛДА","ХАНКА","ХАЙЛО","ХРЕСТ","ХУНТА","ЦУЦИК","ЦВИЛЬ","ЦЫГАН","ЦИЛИК","ЦИРЕЛ","ЦИФРА","ЦЫПКИ","ЦИБИК","ЦАРЁК","ЦЕПЛЯ","ЧОЛКА","ЧАЛКА","ЧИШКА","ЧИЖИК","ЧУМАК","ЧУРКА","ЧЕДРА","ЧУБУК","ЧРЕВО","ЧЕСТЬ","ШУРИН","ШИЛЬЯ","ШАЯТЬ","ШОБОЛ","ШАМОК","ШАРАН","ШВАЛЬ","ШПАНА","ШКЕРЫ","ШКОЛА","ЩЕГОЛ","ЩИРЫЙ","ЩЕПКА","ЩЕГЛА","ЩАНОЙ","ЩАДРА","ЩИПЦЫ","ЩЁЛКА","ЩЕРБА","ЩАВЫЙ","ЭСТЕТ","ЭГИДА","ЭЛИТА","ЭСКИЗ","ЭПОХА","ЭКРАН","ЭРЗАЦ","ЭТИКА","ЭРКЕР","ЭТНОС","ЮЛИТЬ","ЮФЕРС","ЮРИСТ","ЮРКИЙ","ЮЖИКА","ЮННАТ","ЮДОЛЬ","ЮШМАН","ЮМШАН","ЮТИТЬ","ЯКОРЬ","ЯГОДА","ЯСПИС","ЯХОНТ","ЯВНЫЙ","ЯБЕДА","ЯМЧУГ","ЯСТВО","ЯВИТЬ"];

  let currentWord = '';
  let guesses = [];

  const newGame = () => {
    currentWord = words[getRandomArbitrary(0, words.length - 1)];

    console.log(currentWord);

    guesses = [];
  }

  const guess = window.guess = (word) => {
    const newGuess = {
      word,
      info: [],
    };

    word.toUpperCase().split('').forEach((char, index) => {
      if (currentWord[index] === char) {
        newGuess.info[index] = 'HIT';
        return;
      }

      if (!currentWord.includes(char)) {
        newGuess.info[index] = 'WRONG';
        return;
      }

      if (currentWord.includes(char)) {
        newGuess.info[index] = 'MISS';
        return;
      }
    });

    guesses.push(newGuess);

    console.log(newGuess);
  }

})()
