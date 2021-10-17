import styled from '@emotion/styled/macro';
import { IonPage, IonContent, IonFooter } from '@ionic/react';
import { Button, Header } from '../components';
import DiscountItem from '../components/DiscountItem';

const Footer = styled(IonFooter)`
  background: white;
`;

const DiscountContent = styled.div`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;

  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 1fr;
`;

const discounts = [
  {
    id: 1,
    name: '20% Off',
    src: '#',
    dateFrom: '10/04/2020',
    dateTo: '11/04/2020'
  }
];

const ChooseDiscountPage = () => {
  return (
    <IonPage>
      <Header showButton={true} type="back" title="Choose Discount" />
      <IonContent fullscreen>
        <DiscountContent>
          {discounts.map((discount) => (
            <DiscountItem key={discount.id} discount={discount} />
          ))}
        </DiscountContent>
      </IonContent>
      <Footer>
        <Button type="primary">Choose</Button>
      </Footer>
    </IonPage>
  );
};

export default ChooseDiscountPage;
