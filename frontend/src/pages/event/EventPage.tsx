import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const EventPage = () => {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section - Split Design */}
      <div className="container mx-auto grid min-h-screen md:grid-cols-2">
        {/* Left Side - Video */}
        <div className="relative h-[80vh] w-full overflow-hidden md:h-80vh">
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/event/PupilaPhotography_0154.jpg")' }}
          />
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <ReactPlayer
              url="/images/event/event_clip.MOV"
              width="135%"
              height="135%"
              playing
              loop
              muted
              controls={false}
              className="h-full w-full scale-110 object-cover"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1.2)",
                minWidth: "100%",
                minHeight: "100%",
              }}
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-md"
          >
            <h1 className="mb-8 text-4xl font-extralight tracking-tight md:text-5xl lg:text-6xl">
              <span>Mother's Day</span>
              <span className="text-primary-600 mt-4 block text-2xl font-light tracking-[0.2em] md:text-3xl">
                SPECIAL EVENT
              </span>
            </h1>
            <p className="mb-12 text-lg text-gray-600 md:text-xl">
              A curated experience of flowers and flavors, celebrating the beauty of motherhood
            </p>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-center">
                <span className="mr-4 h-[1px] w-8 bg-primary-200" />
                <span>Together with Sophie and Valerie</span>
              </p>

              <p className="flex items-center">
                <span className="mr-4 h-[1px] w-8 bg-primary-200" />
                <a
                  href="https://www.instagram.com/sovalflowers"
                  className="text-primary-600 duration-300 hover:text-primary-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @sovalflowers
                </a>
              </p>
            </div>
            <div className="mt-12 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 p-2">
                  <svg
                    className="text-primary-600 h-full w-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Available until May 4</p>
                  <p className="text-sm text-gray-500">Limited time offer</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 p-2">
                  <svg
                    className="text-primary-600 h-full w-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Handcrafted with Love</p>
                  <p className="text-sm text-gray-500">Each item made to order</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cake Section */}
      <section className="container mx-auto py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-light">Our Special Cake Collection</h2>
            <p className="mb-8 text-lg text-gray-600">
              A beautiful bouquet, tasty yet healthy cupcakes beside your cup of teas. Doesn't that
              sound perfect?
            </p>
            <p className="text-gray-600">
              For the first time, I offer 2 different flavors in one box
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Cake Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src="/images/event/PupilaPhotography_0210.jpg"
                alt="Vanilla & Lavender Cake"
                className="h-80 w-full object-cover object-[25%_85%] transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-light">Vanilla & Lavender</h3>
                <p className="mb-4 text-gray-600">with Strawberry & Rhubarb</p>
                <p className="text-sm text-gray-500">
                  A delicate balance of floral notes and sweet berries, perfect for spring
                  celebrations.
                </p>
              </div>
            </motion.div>

            {/* Cake Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src="/images/event/PupilaPhotography_0149.jpg"
                alt="Vanilla & Lavender Cake"
                className="h-80 w-full object-cover object-[25%_85%] transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-light">Dark Chocolate</h3>
                <p className="mb-4 text-gray-600">with Blackberries</p>
                <p className="text-sm text-gray-500">
                  Rich, indulgent chocolate paired with tart blackberries for a sophisticated flavor
                  profile.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flower Display Section */}
      <section className="bg-primary-100 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-light">Floral Arrangements</h2>
            <p className="mb-4 text-gray-600">
              In collaboration with{" "}
              <a
                href="https://www.instagram.com/sovalflowers"
                className="text-primary-600 duration-300 hover:text-primary-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                @sovalflowers
              </a>
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Flower Display 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src="/images/event/PupilaPhotography_0014.jpg"
                alt="Spring Garden Bouquet"
                className="h-96 w-full object-cover object-[25%_35%] transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                <div>
                  <h3 className="mb-2 text-2xl font-light text-white">Spring Garden</h3>
                  <p className="mb-4 text-white/90">A vibrant mix of seasonal blooms</p>
                  <p className="text-sm text-white/80">
                    Featuring peonies, ranunculus, and seasonal foliage for a fresh spring look.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Flower Display 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <img
                src="/images/event/PupilaPhotography_0023.jpg"
                alt="Spring Garden Bouquet"
                className="h-96 w-full object-cover object-[25%_55%] transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6">
                <div>
                  <h3 className="mb-2 text-2xl font-light text-white">Elegant Rose Collection</h3>
                  <p className="mb-4 text-white/90">Classic beauty in every petal</p>
                  <p className="text-sm text-white/80">
                    A curated selection of premium roses in soft pastel tones.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-light">Special Packages</h2>
            <p className="text-gray-600">Choose your perfect Mother's Day gift</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Package 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg bg-white p-8 shadow-lg"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <span className="text-2xl">🧡</span>
              </div>
              <h3 className="mb-4 text-2xl font-light">Mini Love</h3>
              <p className="mb-6 text-gray-600">Small bouquet + 2 cupcakes</p>
              <p className="mb-4 text-3xl font-light">CHF 55</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Small seasonal bouquet
                </li>
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  2 signature cupcakes
                </li>
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Gift wrapping included
                </li>
              </ul>
            </motion.div>

            {/* Package 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg bg-white p-8 shadow-lg"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <span className="text-2xl">💐</span>
              </div>
              <h3 className="mb-4 text-2xl font-light">Maxi Love</h3>
              <p className="mb-6 text-gray-600">Medium bouquet + 2 cupcakes</p>
              <p className="mb-4 text-3xl font-light">CHF 70</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Medium seasonal bouquet
                </li>
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  2 signature cupcakes
                </li>
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Premium gift wrapping
                </li>
              </ul>
            </motion.div>

            {/* Package 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg bg-white p-8 shadow-lg"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="mb-4 text-2xl font-light">Ultimate Love</h3>
              <p className="mb-6 text-gray-600">Large bouquet + 4 cupcakes</p>
              <p className="mb-4 text-3xl font-light">CHF 95</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Large premium bouquet
                </li>
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  4 signature cupcakes
                </li>
                <li className="flex items-center">
                  <svg
                    className="text-primary-600 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Luxury gift wrapping
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventPage;
