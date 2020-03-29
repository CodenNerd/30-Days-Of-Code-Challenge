const intersectionEye = (arr_one, arr_two) => {
    const intersect = [];
    arr_one.forEach(el_one => {
       const temp = arr_two.filter(el_two => el_one === el_two);

       intersect.push(...temp);
    });

    return [...new Set(intersect)];

}

console.log(intersectionEye([1,2,3,4],[4,2,3,0, 0, 4, '1']));
