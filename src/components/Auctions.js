import useFetch from '../hooks/useFetch';

function Auctions() {
  const { data, isLoading } = useFetch(
    'https://static.bidflyer.com.s3.amazonaws.com/promotional/test.json'
  );
  console.log('Auctions component...');

  if (data?.[0] === 'error') {
    console.log('err:', data[1]);
    return <p>An error has occured in retreiving the data</p>;
  } else if (isLoading) {
    console.log('loading data...');

    return <div>Loading....</div>;
  }
  return (
    <ol className='auctions'>
      {data?.length > 0 &&
        data.map(
          ({
            id,
            currentMinPrice,
            currencySymbol,
            imageUrl,
            outboundId,
            inboundId,
            viewersCount,
            discount,
            endDate,
          }) => (
            <li className='auction' key={id}>
              <img
                src={imageUrl}
                alt=''
                className='auction__img'
                loading='lazy'
              />
              <div className='auction__details'>
                <div className='auction__route'>
                  {outboundId}-{inboundId}
                </div>
                <div className='auction__extra auction__discount'>
                  Discount <br /> {currencySymbol}
                  {discount}
                </div>
                <div className='auction__extra'>
                  Deal available until {new Date(endDate).toUTCString()}
                </div>
                <div className='auction__viewers'>
                  {viewersCount} viewing this
                </div>
              </div>

              <button type='button' className='auction__btn'>
                Now from {currencySymbol}
                {currentMinPrice}
              </button>
            </li>
          )
        )}
    </ol>
  );
}

export default Auctions;
