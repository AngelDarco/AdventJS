const carta = ' bici coche balón _playstation bici coche peluche'

function listGifts(letter) {
    const arr = letter.trim().split(' ')
    let coun = 0
    let x = 0
    let data = {}

    while (coun < arr.length) {
        for (i = 0; i < arr.length; i++) {
            if (arr[coun] == arr[i] && !arr[i].includes('_')&& arr[coun] != ''){
                x++
            }
        }
            if (!arr[coun].includes('_') && arr[coun] != '' && arr[coun] != ' ')
                data[`${arr[coun]}`] = x
            coun++
            x=0
    }
    return data 
}
console.log(listGifts(carta)) 
