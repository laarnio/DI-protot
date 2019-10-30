import Link from 'next/link'

const Banner = () => (
  <div>
    <Link href="/">
      <div className="title" >
        <h1>Verkkokauppa</h1>
      </div>
    </Link>
    <style jsx>{`
      .title {
        text-align: center;
      }
  `}</style>
</div>
);

export default Banner;