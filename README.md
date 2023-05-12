This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



# ここにタイトルを入れる

## DEMO
(https://language-app-xi.vercel.app/)

ただし、リンクを繋げるのを忘れてしまっていて、12:30に間に合わなそうだったので、
ほぼ
https://language-app-xi.vercel.app/lesson/1/note
が現時点での進捗になります。

## 紹介と使い方
※じゃんけんとは全く関係ありません

### 概要
語学勉強をしている際に普段iPadを使用することが多いです。
GoodNotesに教科書のPDFを読み込んで書き込みしながら音声聴いたりして勉強することが多いのですが、
Split Viewを使うにしても色々なツールを都度立ち上げないといけないのが面倒だなと感じていました。

そのため
- 動画視聴
- 音声視聴
- ノート書き込み
- 教科書（PDF）リーディング
を最低限１アプリにオールインワンで詰め込めないかなと思い作っているのが今回のアプリケーションになります。

この次の課題が「じゃんけんRichバージョン」であることから、
1ヶ月かけて作れるということと、何より自分がほしいということから今回の内容になります。

別のテーマとして、
業務でReactを全く使わないので、Reactに慣れるということを目的として技術選定しましたが、
自分全然わかっていないなということがよく分かりましたw

### 使い方
現時点でできることは以下の通りです。

- Layout Modeのところにあるプルダウンで4つのレイアウトを切り替えする。
- 最下部で音声ファイルの再生・停止・倍速再生・リピート再生などオーディオコントローラーの機能が一通り使える。
- ノート部分でとりあえずペンで書くことはできる（逆にいうとそれ以外はまだできていない）
- PDFのページめくり操作ができる
- シャドーイングモードでマイクアイコンのボタンを押すと音声認識を行うことができる。音声認識されたものはPDFの下にテキスト表示される（ただし中国語しか認識しないと思います）
- PDFの一部をマウスドラッグして四角で囲むとその部分をOCRで内容認識→書かれているテキストを読み上げる。
- メニューの開閉など（内容は全部ダミー）


残り2週間で内容を動的にすること含めて、まずはモノとしてできるだけ完成に近づけていきたいです。



## 工夫した点
制作最初にある程度Figmaでラフデザインを落とし込めたこと。
今回はその部分がうまくいったので、しっかり制作開始することができました。


## 苦戦した点
まだ途中ですが、ノート部分に苦戦しています。どうコンポーネントをここから分けていこうという点にとにかく悩みます。

## 参考にした web サイトなど

  - 後で見返せるように