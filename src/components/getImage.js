import Apple from '../assets/images/Apple.jpeg';
import BlackBerry from '../assets/images/BlackBerry.jpeg';
import HTC from '../assets/images/HTC.jpeg';
import Huawei from '../assets/images/Huawei.jpeg';
import LG from '../assets/images/LG.jpeg';
import Motorola from '../assets/images/Motorola.jpeg';
import Nokia from '../assets/images/Nokia.jpeg';
import Samsung from '../assets/images/Samsung.jpeg';
import Sony from '../assets/images/Sony.jpeg';


const images = {
  Apple: Apple,
  BlackBerry,
  HTC,
  LG,
  Motorola,
  Nokia,
  Samsung,
  Sony,
  Huawei
}

export const getImage = (brand) => {
  return images[brand];
}