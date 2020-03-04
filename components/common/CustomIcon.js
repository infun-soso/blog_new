import { createFromIconfontCN } from '@ant-design/icons';
import { iconfontURL } from '@/config/constants'

const Icon = createFromIconfontCN({
  scriptUrl: iconfontURL, // 在 iconfont.cn 上生成
});

const CustomIcon = (props) => {
  return <Icon {...props}></Icon>
}

export default CustomIcon