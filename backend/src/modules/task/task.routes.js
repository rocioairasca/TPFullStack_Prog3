const express = require("express");
const taskService = require("./task.service");
const router = express.Router();

// GET /api/task
router.get("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.description = 'Obtener una lista de tareas paginadas'
  // #swagger.parameters['params'] = { in: 'header', description: 'Parámetros de paginación en formato JSON' }
  try {
    const params = JSON.parse(req.headers['params'])

    const paginatedTasks = await taskService.paginated(params)
    return res.status(200).send(paginatedTasks);

  } catch (error) {
    console.log('Error en GET /api/task:', error)
    return res.status(500).send({ message: "Error al obtener las tareas", error });
  }
});

// GET /api/task/:id
router.get("/api/task/:id",  async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.description = 'Obtener una tarea por su ID'
  // #swagger.parameters['id'] = { description: 'ID de la tarea a obtener' }
  try {
    const taskId = req.params.id;
    const task = await taskService.findOneById(taskId);

    if (!task) {
      return res.status(404).send({ message: "Tarea no encontrada" });
    }

    return res.status(200).send(task);

  } catch (error) {
    console.log("Error en GET /api/task/:id:", error);
    return res.status(500).send({ message: "Error al obtener la tarea", error });
  }
});

// POST /api/task
router.post("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.description = 'Crear una nueva tarea'
  try {
    const newTask = req.body;
    const createdTask = await taskService.save(newTask);
    return res.status(201).send(createdTask);

  } catch (error) {
    console.log("Error en POST /api/task:", error);
    return res.status(500).send({ message: "Error al crear la tarea", error });
  }
});

// PUT /api/task/:id
router.put("/api/task/:id",  async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.description = 'Actualizar una tarea existente'
  // #swagger.parameters['id'] = { description: 'ID de la tarea a actualizar' }
  try {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const task = await taskService.update(taskId, updatedTask);

    if (!task) {
      return res.status(404).send({ message: 'Tarea no encontrada' });
    }

    return res.status(200).send(task);

  } catch (error) {
    console.log("Error en PUT /api/task/:id:", error);
    return res.status(500).send({ message: "Error al actualizar la tarea", error });
  }
});

// DELETE /api/task/:id
router.delete("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  // #swagger.description = 'Eliminar una tarea por su ID'
  // #swagger.parameters['id'] = { description: 'ID de la tarea a eliminar' }
  try {
    const taskId = req.params.id;
    const result = await taskService.remote(taskId);

    if (!result) {
      return res.status(404).send({ message: "Tarea no encontrada" });
    }

    return res.status(200).send({ message: "Tarea eliminada correctamente" });

  } catch (error) {
    console.log("Error en DELETE /api/task/:id:", error);
    return res.status(500).send({ message: "Error al eliminar la tarea", error });
  }
});

module.exports = router;