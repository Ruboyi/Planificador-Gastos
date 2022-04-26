import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatearCantidad } from "../helpers";
import globalStyles from "../styles";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const ControlPresupuesto = ({ presupuesto, gastos, resetearApp }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setTimeout(() => {
      setPorcentaje(Math.round(nuevoPorcentaje));
    }, 1000);

    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={porcentaje}
          rotation={0}
          tintColor="#3B82F6"
          backgroundColor="#F5F5F5"
        >
          {(fill) => (
            <View>
              <Text style={styles.circular}>{porcentaje}%</Text>
              <Text style={styles.circularTexto}>Gastado</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.contenedorTexto}>
        <Pressable onPress={resetearApp} style={styles.boton}>
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>

        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}€
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}€
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}€
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { ...globalStyles.contenedor },
  centrarGrafica: {
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#DB2777",
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "700",
    color: "#3B82F6",
  },
  circular: {
    fontSize: 70,
    textAlign: "center",
    color: "#3B82F6",
  },
  circularTexto: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#64748B",
  },
});

export default ControlPresupuesto;
