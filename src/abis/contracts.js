const addressPro = {//正式
    AbiAddressHash: '0xe05258F44e609Ee831E18FC9d8883f6Df6126c94',
    AbiAddressAgent: "0xC6492623543B37C17b0f3BebA22c76Ad48ac94DC",
    AbiAddressUSDT: '0x668986045594aBfEeF3eF902D3137810Bbe36193',
    addedValue:"115792089237316954235709850086879078532699846656405640394",
    type: 'pro'
}
const addressTest = {//测试
    AbiAddressHash: '0xC1475BBf07572d9EBa5A3F61BF2B701fF6751CcC',
    AbiAddressAgent: "0xE82957C36785D34E6c30Da716F6Efd0393ab9Ff1",
    AbiAddressUSDT: '0x28C630c04417b8959689D3f1b968f76668c30377',
    addedValue:'115792089237316954235709850086879078532699846656405640394',
    type: 'test'
}
const baseAddress = process.env.NODE_ENV == 'development' ? addressTest : addressPro;
export default baseAddress;
