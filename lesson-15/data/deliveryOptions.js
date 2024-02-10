import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from './cart.js';


export let deliveryOptions = [
  {
    deliveryId : '1',
    deliveryDay : 7,
    deliveryCents : 0
  },
  {
    deliveryId : '2',
    deliveryDay : 3,
    deliveryCents : 399
  },
  {
    deliveryId : '3',
    deliveryDay : 1,
    deliveryCents : 999
  }
];

function findDeliveryOptional(deliveryId)
{
  let matchingOption = null;
  deliveryOptions.forEach((optionItem) => {
    if(deliveryId === optionItem.deliveryId)
    {
      matchingOption = optionItem;
    }
  });
  return matchingOption ? matchingOption : deliveryOptions[0];
}

export function deliveryDayOptional(deliveryId)
{
  const deliveryDay = findDeliveryOptional(deliveryId).deliveryDay;
  const today = dayjs();
  return today.add(deliveryDay, 'day').format('dddd, MMMM DD');
}

export function deliveryCentOptional(deliveryId)
{
  const priceCent = findDeliveryOptional(deliveryId).deliveryCents;
  return priceCent;
}