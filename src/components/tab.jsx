import { h, Component } from 'preact'
import { observer }     from 'mobx-preact'
import { bind } from 'decko'
import Store from '../store'
import { selectTab, removeTab } from '../actions/tabs'
import absoluteFill from '../styles/absoluteFill'
import { grey }     from '../styles/colors'

@observer
export class Tab extends Component {
  @bind
  focus(e) {
    e.preventDefault()

    selectTab(this.props.id)
  }

  @bind
  close(e) {
    e.preventDefault()

    removeTab(this.props.id)
  }

  getStyles() {
    const tabs              = Store.tabs.filter(Boolean)
    const width             = Store.tabsWidth / tabs.length
    const id                = this.props.id
    const isSelected        = this.props.selected
    const isntFirstTab      = this.props.id !== tabs[0].id

    return {
      height: 32,
      width: width -1,
      float: 'left',
      left: (length > 1) ? width * filtered.indexOf(this.props.item) : 0,
      display: 'flex',
      userSelect: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',

      tabName: {
        cursor: 'pointer',
        WebkitAppRegion: 'no-drag',
        color: isSelected ? grey[200] : grey[500],
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)'
      },

      tabClose: {
        // Display only if there are 2 or more tabs
        display: (tabs.length > 1) ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        WebkitAppRegion: 'no-drag',
        float: 'right',
        color: isSelected ? grey[200] : grey[500],
        marginRight: 8
      }
    }
  }

  render({ id, title, uid, selected }) {
    let Class = ['tab']
    if(selected) Class.push('selected')

    return <div
      onClick={this.focus}
      uid={uid}
      id={id}
      style={this.getStyles()}
      className={Class.join(' ')}>

        <span style={this.getStyles().tabName} className='tab-title'>
          {title}
        </span>

        <div onClick={this.close} style={this.getStyles().tabClose} className='tab-close'>
          <svg viewBox='0 0 10.2 10.2' style={{ width: 8, height: 8 }}>
            <polygon
              fill={selected ? grey[200] : grey[500]}
              points='10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 '
            />
          </svg>
        </div>

      </div>
  }
}
