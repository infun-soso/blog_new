import {Avatar, Divider} from 'antd'
import '@/public/style/components/author.css'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div><Avatar size={100} src="http://resume.wyfs.top/imgs/a6f01f18.me.png" /></div>
      <div className="author-introduction">
        只有无限努力，才能看起来毫不费力。
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account"  />
        <Avatar size={28} icon="qq"  className="account" />
        <Avatar size={28} icon="wechat"  className="account"  />
      </div>
    </div>
  )
}

export default Author