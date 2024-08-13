/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState} from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { postClient, getClient , putClient } from '../../api/clients'; 
import { getMaquinas } from '../../api/machines'; 
import { Cliente, Maquina } from '../../models/models';

const UserListPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/companies/list">
                Clientes
              </Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Clientes
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for companies"
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configurar</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Deletar</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configurações</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddUserModal />
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Exportar</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllUsersTable />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const AddUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("company");
  const [error, setError] = useState(""); // Estado para mensagem de erro

  // Função para adicionar uma nova empresa
  const handleAddClient = async () => {

    if (!name.trim() || !description.trim()) {
      setError("Nome e Empresa não podem estar vazios.");
      return;
    }
    try {
      const response = await postClient(name, description);
      setOpen(false); 
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const changeSection = (sectionName: string) => {
    setSection(sectionName);
  };
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Adicionar Cliente
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Adicionar Novo Cliente</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <Label htmlFor="companyName">Nome</Label>
            <div className="mt-1">
              <TextInput
                id="companyName"
                name="companyName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escreva o nome do cliente"
              />
            </div>
          </div>
          <div className="mb-2">
            <Label htmlFor="description">Descrição</Label>
            <div className="mt-1">
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva a empresa aqui"
                required
                rows={4}
              />
            </div>
          </div>
          {/* <div className="mb-2">
            <Label htmlFor="controller">Machines</Label>
            <div className="mt-1">
              <Button
                onClick={() => changeSection("controller")}
                color="blue"
                className="w-full secondary mb-2"
              >
                Adicionar Maquina
              </Button>
            </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
        <Button color="primary" onClick={handleAddClient}>
            Adicionar Cliente
          </Button>
          <Button color="gray" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AllUsersTable: FC = function () {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [clientesComMaquinas, setClientesComMaquinas] = useState<{ cliente: Cliente; quantidadeMaquinas: number }[]>([]);

  const fetchData = async () => {
    try {
      const clientesData = await getClient();
      const maquinasData = await getMaquinas();
      setClientes(clientesData); 
      setMaquinas(maquinasData); 
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const processData = () => {
    const maquinasPorCliente = maquinas.reduce((acc: { [key: number]: number }, maquina) => {
      acc[maquina.ClienteID] = (acc[maquina.ClienteID] || 0) + 1;
      return acc;
    }, {});

    const clientesComQuantidadeMaquinas = clientes.map(cliente => ({
      cliente,
      quantidadeMaquinas: maquinasPorCliente[cliente.ID] || 0,
    }));

    setClientesComMaquinas(clientesComQuantidadeMaquinas);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (clientes.length && maquinas.length) {
      processData();
    }
  }, [clientes, maquinas]);

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Selecionar todos
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Nome</Table.HeadCell>
        <Table.HeadCell>Qtd. de Máquinas</Table.HeadCell>
        <Table.HeadCell>Ações</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {clientesComMaquinas.map(({ cliente, quantidadeMaquinas }) => (
          <Table.Row key={cliente.ID} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby={`checkbox-${cliente.ID}`} id={`checkbox-${cliente.ID}`} />
                <label htmlFor={`checkbox-${cliente.ID}`} className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {cliente.Name}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {cliente.Empresa}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {quantidadeMaquinas}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
              <EditUserModal  client={cliente} />
              <DeleteUserModal />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const EditUserModal: FC<{ client: Cliente;}> = function ({ client}) { = function () {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState(client.Name);
  const [description, setDescription] = useState(client.Empresa);

  const handleSave = async () => {
    try {
      await putClient(client.ID, { Name: name, Empresa: description });

      setOpen(false); // Fecha o modal
    } catch (error) {
      console.error("Failed to save client:", error);
    }
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
          Editar Cliente
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Editar Cliente</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            <Label htmlFor="companyName">Nome</Label>
            <div className="mt-1">
              <TextInput
                id="companyName"
                name="companyName"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
              />
            </div>
          </div>
          <div className="mb-2">
            <Label htmlFor="description">Empresa</Label>
            <div className="mt-1">
              <Textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva a empresa aqui"
                required
                rows={4}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="failure" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiTrash className="text-lg" />
          Delete Company
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-6 pb-0 pt-6">
          <span className="sr-only">Delete Company</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this company?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => setOpen(false)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const Pagination: FC = function () {
  return (
    <div className="sticky bottom-0 right-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default UserListPage;