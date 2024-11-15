const data = [
    {
        id: 123,
        title: 'Молоко',
        price: 100,
        src: 'svg/milk.svg',
    },
    {
        id: 321,
        title: 'Шоколад',
        price: 50,
        src: 'svg/chocolate.svg',
    },
    {
        id: 231,
        title: 'Вода',
        price: 24,
        src: 'svg/water.svg',
    },
    {
        id: 412,
        title: 'Хлеб',
        price: 33,
        src: 'svg/bread.svg',
    },
]

let cart = []
const form = document.querySelector('.form')
const cartUI = document.querySelector('.cart')
const total = document.querySelector('.total')
const print = document.querySelector('.print')
const search = document.querySelector('.search')
const searchInput = document.querySelector('.searchInput')

searchInput.addEventListener('input', (e) => {
    items = data.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    search.textContent = items.map((el) => `${el.title} -- ${el.id}`)
    
})


const getItemData = (item) => {
    if(item.count){
        return `${item.title + ' x' + item.count} ----------------------- ${item.price * item.count}р \n`
    } else {
        return `${item.title} ----------------------- ${item.price}р \n`
    }
} 

const printTotal = (cart) => {
    const totalCart = cart.map((el) => getItemData(el))
    alert(totalCart)   
}

const setItemInUICart = (item) => {
    const itemUI = document.createElement('div')

    itemUI.textContent = getItemData(item)
    
    return itemUI
}

const getItem = (item) => {
    const element = cart.find(el => el.id === item.id)
    const elementIndex = cart.findIndex(el => el.id === item.id)

    if(Boolean(element)) {
        cart.splice(elementIndex, 1)
        return {    
            ...element,
            count: element.count ? element.count + 1 : 2
        }   
    }

    return item
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const item = data.find(el => el.id === e.target[0].valueAsNumber)

    if(item) {
        cart.push(getItem(item))
        e.target[0].value = ''
    } else {
        alert('Товар не найден')
    }

    while (cartUI.firstChild) {
        cartUI.firstChild.remove()
    }

    cart.forEach((el) => {
        cartUI.appendChild(setItemInUICart(el))
    })

    total.textContent = `ИТОГ: ${cart.reduce((total, el) => total += el.count ? el.count * el.price : el.price, 0)}рублей`
})

print.addEventListener('click', () => {
    printTotal(cart)
})
