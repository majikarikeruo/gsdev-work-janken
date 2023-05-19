import { Path } from 'paper'

const PaperItem = {
  /**
   * Canvas上にあるPaper.jsのアイテムを取得する
   * @params className・・・アイテムの種類。Groupがシェーマアイコン、Rasterが画像、Pathがペンツール
   * @params selected・・・選択状態にあるものかないものかを選別
   */
  getPaperItems(canvas, className, selected = null) {
    const allItemsOnCanvas = canvas.project.getItems({
      selected,
      class: className,
    })
    return allItemsOnCanvas
  },
  /**
   * Canvas上にあるPaper.jsの手書き(Path)のみを取得する
   * @params className・・・アイテムの種類。Groupがシェーマアイコン、Rasterが画像、Pathがペンツール
   * @params selected・・・選択状態にあるものかないものかを選別
   */
  getAllPath(canvas) {
    const allPathOnCanvas = canvas.project.getItems({
      class: Path,
    })
    return allPathOnCanvas
  },

  /**
   * PaperJSの全Pathを取得させる
   * // 現在のgetItemsの仕方だとGroupの中のPathが二重に選択されて
   * // そのため、children扱いのものは何もしないように
   */

  getSelectedItems(canvas, lassoPath = null) {
    return [
      ...this.getPaperItems(canvas, 'Group', true),
      ...this.getPaperItems(canvas, 'Raster', true),
      ...this.getPaperItems(canvas, 'Path', true),
      lassoPath,
    ].filter((item) => item && item.parent && item.parent.className !== 'Group')
  },

  /**
   * PaperJSのアイテムを移動させる
   * @params paperJsItem
   * @params delta
   */
  move(paperJsItem, delta) {
    if (paperJsItem.className === 'Group') {
      const { center } = paperJsItem.bounds
      center.x += delta.x
      center.y += delta.y
    } else {
      const { position } = paperJsItem
      position.x += delta.x
      position.y += delta.y
    }
  },
}

export default PaperItem
