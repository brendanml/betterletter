const Logo = () => (
  <a href="#" className="flex items-center gap-1 text-lg font-semibold text-primary-foreground!">
    <span>Better Letter</span>
  </a>
);

const Footer = () => (
  <footer className="bg-primary px-6 py-10 text-sm text-white">
    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
      <div>
        <Logo />
        <p className="mt-4 max-w-xs text-muted-foreground/80">
          Empowering talented individuals to get the interviews they deserve with personalized cover letters.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="mb-2 font-medium text-white">Company</h4>
        <a href="#" className="hover:underline text-muted-foreground!">Support</a>
        <a href="#" className="hover:underline text-muted-foreground!">Contact</a>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="mb-2 font-medium text-white">Legal</h4>
        <a href="#" className="hover:underline text-muted-foreground!">Privacy Policy</a>
        <a href="#" className="hover:underline text-muted-foreground!">Terms & Conditions</a>
      </div>
    </div>

    <p className="mt-10 text-center text-xs text-muted-foreground">
      © 2025 Better Letter. All rights reserved.
    </p>
  </footer>
);

export default Footer;