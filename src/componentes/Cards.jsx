import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { Trash, Pencil, CirclePlus } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';

export function Cards() {
  const { historias, dataHistoria, setDataHistoria, updateHistoria, addHistoria, deleteHistoria } = useGlobalContext();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

  const handleEdit = (historia) => {
    setDataHistoria(historia);
    onEditOpen();
  };

  const handleAdd = () => {
    setDataHistoria({
      fecha: '',
      titulo: '',
      experiencia: '',
      comentarios: '',
      imagen: ''
    });
    onAddOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataHistoria((prev) => ({ ...prev, [name]: value }));
  };

  const controladorActualizaHistorias = () => {
    console.log(`ID de la historia: ${dataHistoria.id}`);
    console.log('Información de la historia:', dataHistoria);
    updateHistoria(dataHistoria);
    onEditClose();
  };

  const controladorGuardarNuevaHistoria = () => {
    console.log('Nueva historia:', dataHistoria);
    addHistoria(dataHistoria);
    onAddClose();
  };

  const controladorBorrarHistoria = (id) => {
    console.log(`ID de la historia a borrar: ${id}`);
    deleteHistoria(id);
  };

  return (
    <>
      <div className="relative w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {historias.map(historia => (
          <Card key={historia.id} className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-2xl transition-transform transform hover:scale-105">
            <Image
              removeWrapper
              alt={historia.titulo}
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={historia.imagen}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
            <CardHeader className="absolute top-4 left-4 z-20">
              <p className="text-white text-sm uppercase font-bold">{historia.fecha}</p>
              <h4 className="text-white text-2xl font-bold">{historia.titulo}</h4>
            </CardHeader>
            <CardBody className="absolute bottom-16 left-4 z-20">
              <p className="text-white text-sm">{historia.experiencia}</p>
            </CardBody>
            <CardFooter className="absolute bottom-4 left-4 z-20 flex space-x-4">
              <Button auto flat icon={<Pencil />} className="text-white bg-yellow-500 hover:bg-yellow-600" onPress={() => handleEdit(historia)}>Editar</Button>
              <Button auto flat icon={<Trash />} className="text-white bg-red-500 hover:bg-red-600" onPress={() => controladorBorrarHistoria(historia.id)}>Eliminar</Button>
            </CardFooter>
          </Card>
        ))}
        <Button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-3 text-lg transition-transform transform hover:scale-105" auto onPress={handleAdd}><CirclePlus /></Button>
      </div>

      {/* Modal para editar historia */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditClose} placement="top-center">
        <ModalContent>
          {(onEditClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar Historia</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Fecha"
                  placeholder="Enter the date"
                  type="date"
                  variant="bordered"
                  name="fecha"
                  value={dataHistoria?.fecha || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Titulo"
                  placeholder="Enter the title"
                  variant="bordered"
                  name="titulo"
                  value={dataHistoria?.titulo || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Experiencia"
                  placeholder="Enter the experience"
                  variant="bordered"
                  name="experiencia"
                  value={dataHistoria?.experiencia || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Comentarios"
                  placeholder="Enter comments"
                  variant="bordered"
                  name="comentarios"
                  value={dataHistoria?.comentarios || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Imagen"
                  placeholder="Enter the image URL"
                  variant="bordered"
                  name="imagen"
                  value={dataHistoria?.imagen || ''}
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onEditClose}>
                  Close
                </Button>
                <Button color="primary" onPress={controladorActualizaHistorias}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal para agregar nueva historia */}
      <Modal isOpen={isAddOpen} onOpenChange={onAddClose} placement="top-center">
        <ModalContent>
          {(onAddClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Nueva Historia</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Fecha"
                  placeholder="Enter the date"
                  type="date"
                  variant="bordered"
                  name="fecha"
                  value={dataHistoria?.fecha || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Titulo"
                  placeholder="Enter the title"
                  variant="bordered"
                  name="titulo"
                  value={dataHistoria?.titulo || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Experiencia"
                  placeholder="Enter the experience"
                  variant="bordered"
                  name="experiencia"
                  value={dataHistoria?.experiencia || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Comentarios"
                  placeholder="Enter comments"
                  variant="bordered"
                  name="comentarios"
                  value={dataHistoria?.comentarios || ''}
                  onChange={handleInputChange}
                />
                <Input
                  label="Imagen"
                  placeholder="Enter the image URL"
                  variant="bordered"
                  name="imagen"
                  value={dataHistoria?.imagen || ''}
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onAddClose}>
                  Close
                </Button>
                <Button color="primary" onPress={controladorGuardarNuevaHistoria}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
