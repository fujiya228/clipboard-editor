import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const { clipboard } = require('electron')

// コンポーネントを定義
export default class App extends Component {
  constructor(props) {
    super(props)
    // 状態を初期化
    this.state = {
      text: '',
      isActive: true,
      rewrite: true,
      trim: false,
      editor: 0
    }
    // クリップボード監視
    setInterval(e => this.tick(), 1000)
  }
  tick() {
    if (!this.state.isActive) return
    let clip = clipboard.readText()
    let clip2 = clip
    let newText = document.getElementById('newText_' + this.state.editor)

    // クリップボードに変更があれば編集テキストを修正
    if (this.state.text !== clip) {
      newText.value = clip
    }
    // 編集テキストを変更
    if (this.state.rewrite) {
      clip2 = newText.value
      // 改行を半角スペースに変換
      if (this.state.trim) {
        clip2 = clip2.replace(/\r?\n{1,}/g, " "); // \r\n or \nが1回以上
      }
    }
    if (clip !== clip2) {
      clipboard.writeText(clip2)
    }
    this.setState({ text: clip2 })
  }
  changeState(e) {
    const name = e.target.name
    this.setState({ [name]: !this.state[name] })

    myNotification.onclick = () => {
      console.log('Notification clicked')
    }

  }
  changeEditor(num) {
    const newText = document.getElementById('newText_' + num).value
    this.setState({
      editor: num,
      text: newText
    })
    clipboard.writeText(newText)
  }
  render() {
    const taStyle = {
      width: '100%',
      height: '100px',
      backgroundColor: '#F4F4F4',
      resize: 'none'
    }
    return (<div className='window'>
      <div className='window-content'>
        <div className='pane-group'>
          <div className='pane-sm sidebar'>
            <div>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <label>
                    <input type='checkbox'
                      checked={this.state.isActive}
                      name='isActive'
                      onChange={e => this.changeState(e)} />
                      監視を有効にする
                  </label>
                </li>
                <li className='list-group-item'>
                  <label>
                    <input type='checkbox'
                      checked={this.state.rewrite}
                      name='rewrite'
                      onChange={e => this.changeState(e)} />
                    クリップボードを編集
                  </label>
                </li>
                <li className='list-group-item'>
                  <label>
                    <input type='checkbox'
                      checked={this.state.trim}
                      name='trim'
                      onChange={e => this.changeState(e)} />
                    改行をトリミング
                  </label>
                </li>
                <li className='list-group-item'>
                  <label>
                    <input type='radio'
                      checked={this.state.editor === 0}
                      name='changeEditor'
                      onChange={e => this.changeEditor(0)} />
                    Editor:0
                  </label>
                </li>
                <li className='list-group-item'>
                  <label>
                    <input type='radio'
                      checked={this.state.editor === 1}
                      name='changeEditor'
                      onChange={e => this.changeEditor(1)} />
                    Editor:1
                  </label>
                </li>
                <li className='list-group-item'>
                  <label>
                    <input type='radio'
                      checked={this.state.editor === 2}
                      name='changeEditor'
                      onChange={e => this.changeEditor(2)} />
                    Editor:2
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className='pane'>
            <div className='padded-more'>
              クリップボード:<br />
              <textarea style={taStyle} value={this.state.text} />
              Editor_0:<br />
              <textarea style={taStyle} id="newText_0" />
              Editor_1:<br />
              <textarea style={taStyle} id="newText_1" />
              Editor_2:<br />
              <textarea style={taStyle} id="newText_2" />
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}
// DOMを書き換え
ReactDOM.render(
  <App />,
  document.getElementById('root'))
