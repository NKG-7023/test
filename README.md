# 目次
1. [タスクリスト](#タスクリスト)


# プロジェクトの取り扱い方
- 	README.md  
	基本的にネット上でGithubにあるやつ(リモートリポジトリ)の  
	**mainブランチにあるファイル自体を**編集する。  
-	各個人の独自の編集は、リモートリポジトリのmainブランチではなく、  
	各自が作ったブランチ上とし、**安定動作版となった場合のみ**、  
	mainブランチに追加して良い。
- 	mainブランチへの追加は、**Create Pull Requestまで**を可能とし、  
	Merge(Merge Pull Request)は**相手が承認するまで待つ**。  
	ちなみに、Pull Requestを建てると、相手にメールが行く。

# スケジュール
## 全体
- 	4月中は、各自の学習を続ける。  
	並行してゲームのアイデアが思いつけば、書き加える。

## NKG
- 	JavaScriptに習熟する。  
	とりあえずmain.js, engine.jsの中身はおおよそ理解する。
	(4月中を目標)

## Tsubaki
-	4月中旬までに、このREADMEの「プログラム説明」を完成させる

# ゲーム概要  
## コンセプト
## ジャンル
## イメージ

# タスクリスト
- [x] a 
- [ ] f

# 掲示板
自由に質問やコメント、思いついたアイデアを書く
-	ドット絵の拡大は、
	image-rendering: pixelatedを使う?

# プログラム説明
## 特記事項
キャラクターの座標は細かめの精度が欲しいため、  
スクリーン座標(640, 480)よりも100倍の精度で計算し、  
整数のみを取り扱うこととする。

## 関数一覧
### テンプレート(関数名をここに書く)
引数:
1.	引数名(欲しい型 整数か画像かなど)  
	もし必要なら説明
2.  

返り値と簡単な説明(主に役割や動作)

### PosToL
引数:  
1. x, y(整数)

ワールド座標を渡すと、ローカル座標におけるベクトルとして返す。

### PosToW
引数:  
1.	x, y(整数)
	ローカル座標をワールド座標に変換


## クラス一覧
### テンプレート(クラス名をここに書く)
変数:
1.	変数名(欲しい型)  
	もし必要なら説明
2.  

メソッド:  
1.	メソッド名  
	簡単な説明(返り値や動作など)

### Vec2
変数:
1.	x, y(整数)
2.	length(実数)  
	ベクトルの長さを取得

メソッド:
1.	add  
	引数:v(ベクトル)  
	各要素の和を取る。  
	v1.add(v2);

2.	addPt  
	引数:x, y(整数)  
	各要素の和を取る。(各座標を引数とする)  

3.	multiply  
	引数:a(実数)  
	各要素を定数倍する。  
	v1.multiply(1.5);

4.	dot  
	引数:v(ベクトル)  
	各要素の内積を取る。  
