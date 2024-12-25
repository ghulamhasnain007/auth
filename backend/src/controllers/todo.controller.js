
const db = require('../config/db.config.js'); // Import db connection

const createTodo = async (req, res) => {
    try {
        const { task, description, createdBy } = req.body;

        // Basic validation
        if (!task || !createdBy) {
            return res.status(400).json({ message: 'Task and CreatedBy fields are required!' });
        }

        // Insert todo into the database
        const query = 'INSERT INTO todos (task, description, created_by) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [task, description, createdBy]);

        if (!result) {
            throw new Error('Failed to insert todo into the database.');
        }

        console.log('Todo data:', result);

        // Respond with the created todo ID
        return res.status(201).json({
            data: result,
            message: 'Todo created successfully.',
        });
    } catch (error) {
        console.error('Error Creating Todo:', error);
        return res.status(500).json({ message: error.message });
    }
};


const getTodoByUser = async (req, res) => {
    try {
         const { user } = req.params;
 
         if (!user) {
             return res.status(400).json({ message: 'Please Provide User Id' });
         }
 
         const [result] = await db.query("SELECT * FROM todos WHERE created_by = ?", [user]);
 
         if (result.length === 0) {
             return res.status(404).json({ data: null, message: "No Todos Found" });
         }
 
         return res.status(200).json({ data: result, message: "Todos fetched successfully" });
 
    } catch (error) {
         return res.status(500).json({ message: error.message });
    }
 };


const updateTodo = async(req, res) => {
       try {
            const { todo_id }  = req.params;
            const { task, description} = req.body;
            if(!task && !description) 
            {
                return res.status(404).json({message: "at least one field require to update"})
            }

            let query = 'UPDATE todos SET ';
            const values = [];

            if(task){
                query += 'task = ?, '
                values.push(task)
            }
            if(description){
                query += 'description = ?, '
                values.push(description)
            }
            query = query.slice(0, -2);
            query += 'WHERE todo_id = ?';
            values.push(todo_id)

            const [result] = await db.query(query, values)
            if(result.affectedRows === 0){
                return res.status(400).json({message: "todo not found"})
            }
            return res.status(200).json({data: result, message: "todo updated successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { todo_id } = req.params;
        const query = `DELETE FROM todos WHERE todo_id = ?`;
        const [result] = await db.query(query, [todo_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No todo found with id ${todo_id}` });
        }

        return res.status(200).json({ data: result, message: `Todo with id ${todo_id} successfully deleted` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



 
 module.exports = {
     createTodo,
     getTodoByUser,
     updateTodo,
     deleteTodo
 };
 