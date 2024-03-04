import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import TabsList from "../tabs/tabs-list";
import Filters from "./filters";
import LayoutSwitch from "./layout-switch";

export default function Header() {
  return (
    <Navbar
      maxWidth="full"
      isBlurred
      classNames={{
        wrapper: "flex-col gap-4 py-6 px-6 max-w-7xl mx-auto h-auto",
        content: "flex-wrap w-full sm:flex-nowrap",
        item: "w-full gap-4 items-center",
      }}
      className="h-64 sm:h-40"
    >
      <NavbarContent>
        <NavbarItem>
          <TabsList />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem className="flex flex-wrap sm:w-10/12 sm:flex-nowrap">
          <Filters />
        </NavbarItem>
        <NavbarItem className="flex sm:justify-end sm:w-2/12">
          <LayoutSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
