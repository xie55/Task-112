let datbase = require('./datbase.js')
let promotions=datbase.loadPromotions()[0].barcodes;
let inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
]
//统计条码个数
function getCartITem(inputs){
    let cartItem=[]
    let obj={}
    for(let i of inputs){
        if(i.indexOf('-')===-1){
            if(!obj[i]){
                obj[i]=1
            }else{
                obj[i]++
            }
        }else{
            let splitArr=i.split('-')
            if(!obj[splitArr[0]]){
                obj[splitArr[0]]=splitArr[1]
            }
        }
    }
    for(let i in obj){
        cartItem.push({barcode:i,count:obj[i]})
    }
    return cartItem
}
//获取商品信息
function getCartInfo(cartItem){
    let cartInfo=[]
    let allItem=datbase.loadAllItems()
    for(let i of cartItem){
        for(let j of allItem){
            if(i.barcode===j.barcode){
                cartInfo.push({barcode:i.barcode,count:i.count,name:j.name,unit:j.unit,price:j.price.toFixed(2)})
            }
        }
    }
    return cartInfo
}
//获取礼物
function getGifts(cartItem){
    let gifts=[]
    for(let i of cartItem){
        for(let j of promotions){
            if(i.barcode==j){
                if(i.count>2){
                    gifts.push(i.barcode)
                }
            }
        }
    }
    return gifts
}
function printInventory(cartItem,cartInfo,gifts){
    let result='***<没钱赚商店>购物清单***\n'
    let allPrice=0
    let savePrice=0
    for(let i of cartInfo){
        allPrice+=i.count*i.price
        result+='名称：'+i.name+'，数量：'+i.count+i.unit+'，单价：'+i.price+'(元)，小计：'+(i.count*i.price).toFixed(2)+'(元)\n'
    }
    result+=    '----------------------\n' +
    '挥泪赠送商品：\n' 
    for(let i of cartInfo){
        for(let j of gifts){
            if(i.barcode==j){
                savePrice+=parseFloat(i.price)
                result+='名称：'+i.name+'，数量：'+'1'+i.unit+'\n'
            }
        }
    }
    result+='----------------------\n' +
    '总计：'+allPrice.toFixed(2)+'(元)\n' +
    '节省：'+savePrice.toFixed(2)+'(元)\n' +
    '**********************'
    return result
}
let cartItem=getCartITem(inputs)
let cartInfo=getCartInfo(cartItem)
let gifts=getGifts(cartItem)
let result=printInventory(cartItem,cartInfo,gifts)
module.exports = function main(inputs){
    let cartItem=getCartITem(inputs)
    let cartInfo=getCartInfo(cartItem)
    let gifts=getGifts(cartItem)
    let result=printInventory(cartItem,cartInfo,gifts)
    return result;
}