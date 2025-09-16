import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="py-6 text-gray-700 text-sm sm:text-base lg:text-lg text-center bg-transparent space-y-2">
        <p>
            © 2024 Copyright:{" "}
            <a
            href="https://isi-finSpot.csr.unibo.it"
            className="underline hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
            >
            isi-finSpot.csr.unibo.it
            </a>
        </p>
        <button
            onClick={() => navigate("/privacy")}
            className="underline hover:text-blue-600 cursor-pointer"
        >
            Informativa privacy
        </button>
    </footer>

  );
}
