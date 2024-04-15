


const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full  bg-gray-500 text-white">
      <div className="container mx-auto py-4 text-center">
        <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer;