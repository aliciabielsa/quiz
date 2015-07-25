var path = require('path');

//cargar modelo ORM
var sequelize = new Sequelize(null, null, null,
	{dialect: "sqlite", storage: "quiz.sqlite"}
	);
// importar la definicion de la tabla quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;  // exportar definicion de tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync()success(function() {
	// success (..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count){
		if (count === 0 ){   // la tabla se inicializa solo si esta vacia
			Quiz.create({ pregunta: 'Capital de Italia',
		                  respuesta : 'Roma'
		              })
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});

