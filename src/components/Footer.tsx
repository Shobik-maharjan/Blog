const Footer = () => {
  return (
    <div className="grid grid-cols-4 gap-4 py-4 w-8/12 mx-auto">
      <div className="about col-span-2 px-2">
        <h2 className="font-medium">About</h2>
        <p>
          Mobile Blog is your ultimate destination for all things mobile. Our
          team of experts is dedicated to bringing you the latest news, reviews,
          and guides to help you make informed decisions about smartphones.
          {/* Explore our content and stay connected with the latest trends in the
          world of mobile technology. */}
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="font-medium">Contact With us:</li>
        <li>Facebook</li>
        <li>Twitter</li>
        <li>Instagram</li>
      </ul>

      <ul className="flex flex-col gap-2">
        <li className="font-medium">Explore more:</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Terms of Service</li>
      </ul>
    </div>
  );
};

export default Footer;
