import Header from '../components/header'
import Head from '../components/head'
import TypeIt from 'typeit-react'

const Index = () => {
  return (
    <>
      <Head />

      <Header />
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-screen">
        <div class="hero min-h-fit bg-base-200">
          <div class="hero-content flex-col lg:flex-row-reverse p-0 md:p-16">
            <img src="/logo.png" class="max-w-sm rounded-lg" alt="this" />
            <div>
              <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Search for job opportunities posted by AIT Alums.
                <br/>
                Get placed AITians, by AITians.
              </p>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to the</span>{' '}
                <br/>
                <span className="block text-green-400 xl:inline">Alumn
                  <TypeIt
                      options={{
                        strings: ["ati","AIT"],
                        speed: 300,
                        waitUntilVisible: true,
                        loop:true,
                        breakLines: false,
                        loopDelay: 2000,
                        startDeplay: 2000,
                        nextStringDelay: 4250,
                        lifeLike: true
                      }
                    }/>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Index