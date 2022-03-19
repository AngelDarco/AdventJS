const ovejas = [
    { name: 'Noa', color: 'azul' },
    { name: 'Euge', color: 'rojo' },
    { name: 'Navidad', color: 'rojo' },
    { name: 'Ki Na Ma', color: 'rojo'},
    { name: 'AAAAAaaaaa', color: 'rojo' },
    { name: 'Nnnnnnnn', color: 'rojo'}
  ]
    
 function contarOvejas(ovejas) {
    const filter = ovejas.filter(item => item.name.toUpperCase().includes('N') && item.name.toUpperCase().includes('A') && item.color == 'rojo')
  return filter
}

const res = contarOvejas(ovejas);
console.log(res)