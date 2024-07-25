import { info } from "../../../info";

export default function Footer() {
  return (
    <footer className="relative mb-0  border-t">
      <div className="bg-brand-2 py-6">
        <div className="container text-white p-8">
          <p className="text-center ft-0 m-0">
            Todos los derechos reservados. {info.companyName} ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
