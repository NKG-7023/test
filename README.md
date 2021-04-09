# ゲーム概要  
## コンセプト
## ジャンル
## イメージ


# タスクリスト
- [x]  
- [ ]  

# 掲示板
自由に質問やコメントを書く

# プログラム説明
## 特記事項
キャラクターの座標は細かめの精度が欲しいため、  
スクリーン座標(640, 480)よりも100倍の精度で計算し、  
整数のみを取り扱うこととする。

## 関数一覧
### テンプレート(関数名をここに書く)
引数:
1. 引数名(欲しい型 整数か画像かなど)  
もし必要なら説明
2.  

返り値と簡単な説明(主に役割や動作)

### PosToL
引数:  
1. x, y(整数)

ワールド座標を渡すと、ローカル座標におけるベクトルとして返す。

### PosToW
引数:  
1. x, y(整数)
ローカル座標をワールド座標に変換


## クラス一覧
### テンプレート(クラス名をここに書く)
変数:
1. 変数名(欲しい型)  
もし必要なら説明
2.  

メソッド:  
1. 

簡単な説明

### Vec2
変数:
1. x, y(整数)
2. length(実数)  
ベクトルの長さを取得

メソッド:
1. add  
引数:v  
各要素の和を取る。  
v1.add(v2);

2. addPt  
引数:x, y  
各要素の和を取る。(各座標を引数とする)  

3. multiply  
引数:a   
各要素を定数倍する。  
v1.multiply(1.5);

4. dot  
引数:v
各要素の内積を取る。  
v1.dot(v2);
