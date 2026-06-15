import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <div className="w-full h-24 bg-gray-900 fixed inset-0">
        <div className="w-full h-full flex justify-between items-center inset-0">
          <Link to={'/'}>
            <p className="font-bold text-3xl text-white ml-5">
              Aly <span className="bg-amber-400 p-2 rounded"> Camaliot</span>
            </p>
          </Link>
          <div className="flex gap-2 mr-4">
            <Button
              className="rounded-full font-bold"
              size={'lg'}
              variant={'outline'}>
              Create Post
            </Button>
            <Link to={'/auth'}>
              <Button
                className="rounded-full bg-transparent"
                size="lg"
                variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
