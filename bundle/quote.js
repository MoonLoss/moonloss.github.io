
var dictaColor = 'rgb(41, 56, 70)'; //文字颜色

var dictumin = new Array(
    '“一心向道无杂念 皈依三宝弃红尘” ——《青城山下白素贞》',
    '“在人生的道路上，当你的希望一个个落空的时候，你也要坚定，要沉着。” ——朗费罗',
    '“无论如何，当诚信与忠实这样的品质在中国人的道德意识中占据了理应占据的位置，那么（不久的将来），中国人那无与伦比的勤劳就将赢得圆满的回报。” ——明恩溥《中国人的气质》',
    '“如果你忘记未来/你失去的/就是现在” ——妙莉叶·芭贝里《刺猬的优雅》',
    '“过一个平凡无趣的人生实在太容易了，你可以不读书，不冒险，不运动，不写作，不外出，不折腾……但是，人生最后悔的事情就是：我本可以。” ——陈素封',
    '“强者/在人间/什么都不做/他们说话/不断地说话” ——妙莉叶·芭贝里《刺猬的优雅》',
    '“我握住天赋的刀锋，却落得一身伤痕。” ——威尔·格雷厄姆《汉尼拔》',
    '“走正道，会有未来。” ——蔡晶晶, i春秋',
    '钢笔字上手容易，下笔简单、快捷，写出来的东西叫做文章。毛笔字需要长期磨练，上手较难，但是一旦掌握了，便能行云流水，心随念想，可进可退，只在笔尖，写出来的东西叫作艺术。',
    '“天不老，情难绝，只要有青春，就会有爱恋，只要有别离，就会有相思，只要有心意，就一定会有那些寄不出去的情书。” ——于丹',
    '当你停止创造，你的才能就不再重要，剩下的只有品味，品味会排斥其他人，让你变得更狭隘，所以，要创造。希望你能因为自己生产了好东西而感到骄傲，而不是洋洋自得于消费了什么好东西，好品味不值得骄傲。',
    '“未来，它的作用就是：用充满活力的真正计划来构建现在美好的生活。” ——妙莉叶·芭贝里《刺猬的优雅》',
    '锻炼或者学习，身体和精神得有/一个在路上。/只有你放弃的那一刻，才算是真的输了。',
    '“生命是抽象的概念，很容易发现什么是自己不要的，却很难知道什么是自己想要的。”',
    '“小时候幸福是一件简单的事，长大后简单是一种幸福的事”',
    '“将善举当成一种习惯去饯行一辈子，生命就可以在黑暗中璀璨”',
    '"May God break my heart so completely that the whole world falls in." ― Mother Teresa',
    '"Find out who you are - and try not to be afraid of it" ― Josie Geller',
    '我住长江头，君住长江尾。 I live at the uper place of the Yangze River,you lower.',
    '天下的一切都是忙出来的，唯独文化是闲出来的。'

 );

function dowritedicta(num){
    var randid = Math.round(Math.random()*num);
    randid = randid >= num ? num-1 : randid;
    
    //document.write('<p style="' + 'color: '+ dictaColor +';' + '">' + dictumin[randid] + '</p>');
    //var p = '<p style="' + 'color: '+ dictaColor +';' + '">' + dictumin[randid] + '</p>';
    var container = document.getElementById('quote'); //找到父级元素
    var quote = document.createElement("p");
    quote.innerHTML = dictumin[randid];
    quote.style.color = dictaColor;
    container.appendChild(quote);

}

dowritedicta(dictumin.length);
