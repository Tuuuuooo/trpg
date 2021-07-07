const fs = require('fs');

const jsonObject = JSON.parse(fs.readFileSync('./item.json', 'utf8'));

let Drop = ItemDrop(jsonObject,1)

console.log(Drop)

function ItemDrop(ItemJson, Level) {
    let totalWeight = 0;
    let pick = [];
    let Length = 0;

    //トータルの重みを計算する
    ItemJson.Item.forEach((obj) => {
        totalWeight += obj.ratio;
    });

    //配列の長さを取得する
    Length = ItemJson.Item.length;

    //抽選する
    let rnd = Math.floor(Math.random() * totalWeight);

    for (let i = 0; i < Length; i++) {
            if (rnd < ItemJson.Item[i].ratio) {
                //出現レベルを確認
                if(Level === ItemJson.Item[i].level){
                    // 抽選対象決定
                    pick[0] = ItemJson.Item[i].name;
                    pick[1] = ItemJson.Item[i].money;
                    pick[2] = ItemJson.Item[i].page;
                    break;
                }else {
                    continue;
                }
            }
        //次の対象を調べる
        rnd -= ItemJson.Item[i].ratio;
    }
    return pick;
}