import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-4 fixed bottom-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-zinc-300">
          Powered by{' '}
          <Link 
            href="https://raulcano.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:underline text-yellow-400"
          >
            Raul Cano
          </Link>
          
          <span className="block sm:inline-block sm:ml-2">
            for the{' '}
            <Link
              href="https://widgilabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline text-yellow-400"
            >
              WidgiLabs
            </Link>
            {' '}team{' '}🎉
          </span>
        </p>
      </div>
    </footer>
  )
}