const main = require('../main/main');
describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function () {


        spyOn(console,'log');
        //main(inputs);
        console.log(main(inputs));
        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：13.50(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：58.50(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    })
    
    it('should print correct when no promotion can be used',function(){
        let inputs=[
            'ITEM000002-3',
            'ITEM000003-2',
            'ITEM000004-2'
        ]
        
        let expectText = 
        '***<没钱赚商店>购物清单***\n' +
        '名称：苹果，数量：3斤，单价：5.50(元)，小计：16.50(元)\n' +
        '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
        '名称：电池，数量：2个，单价：2.00(元)，小计：4.00(元)\n' +
        '----------------------\n' +
        '挥泪赠送商品：\n' +
        '----------------------\n' +
        '总计：50.50(元)\n' +
        '节省：0.00(元)\n' +
        '**********************'

        let result=main(inputs)

        expect(result).toEqual(expectText)
    })
})
