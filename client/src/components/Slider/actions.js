//====================== слайдер ==============================//

  //функция для смещения слайдов влево
  export  const handleClickOffsetLeft = (setState, setComparison, s = 2, n = 1) => {
    //s - общее количество слайдов для показа, по умолчанию 2
    //n - количество слайдов в видимом блоке, по умолчанию 1
    //setState - начальное состояние смещенности, например: const [offset, setOffset] = useState(0)
    //setComparison - состояние сравнения (newOffset === minOffset)
    const percent = 100 / n;
    setState((currentOffset) => {
        const newOffset = currentOffset - percent * n;
        const minOffset = -(percent * (s - n));
        //console.log(`"newOffset_left:" ${newOffset}`, `"minOffset_left:" ${minOffset}`, currentOffset, Boolean(newOffset === minOffset));
        setComparison(newOffset === minOffset);
        return Math.max(newOffset, minOffset);
    });
};

  //функция для смещения слайдов вправо
  export  const handleClickOffsetRight = (setState, n = 1) => {
    //n - количество слайдов в видимом блоке, по умолчанию 1
    const percent = 100 / n;
    setState((currentOffset) => {
        const newOffset = currentOffset + percent * n;
        const maxOffset = 0;
        //console.log(`"newOffset_rihgt:" ${newOffset}`, `"maxOffset_rihgt:" ${maxOffset}`, currentOffset, Boolean(newOffset === maxOffset));
        return Math.min(newOffset, maxOffset);
    });
};

export const numberSlides = (n = 1) => {
  //n - количество слайдов в видимом блоке, по умолчанию 1
  return 100 / n;
};

//====================== слайдер ==============================//