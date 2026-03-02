# 🚛 NTF Transportes Fernández — Sistema Integral de Transporte v3

Sistema de gestión integral para empresa de transporte internacional (Perú - Ecuador - Colombia).

## Módulos incluidos

- **📊 Dashboard** — KPIs gerenciales, rentabilidad por viaje, cuentas por cobrar
- **🚛 Viajes (Kanban)** — Programación, seguimiento y estados de viajes
- **⛽ Combustible** — Compras Ecuador vinculadas a viajes, pagadas con bolsa
- **💰 Liquidación** — Costeo real por viaje (Base Imponible, sin IGV)
- **📎 Documentos** — Gestión de facturas, boletas, docs internos y externos
- **📕 Registro de Compras** — Todos los gastos con sustento documentario
- **📗 Registro de Ventas** — Facturación por viaje con estado de cobro
- **💳 Cuentas por Cobrar** — Viajes pendientes de facturar y de cobrar

## Características clave

- Combustible Ecuador: Factura extranjera + Tipo de Cambio = Costo real
- Separación Base Imponible / IGV para costeo (IGV no es costo)
- Viajes canjeados por facturas o documentos internos
- Estado de cuenta: PEND_FACTURAR → PENDIENTE (cobro) → COBRADO
- Multi-moneda: PEN, USD, COP con tipo de cambio

---

## 🚀 PUBLICACIÓN EN VERCEL (Gratis, 5 minutos)

### Paso 1: Crear cuenta en GitHub
Si no tienes cuenta: ve a https://github.com y crea una (gratis).

### Paso 2: Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `ntf-transporte`
3. Privado: ✅ (recomendado)
4. Click "Create repository"

### Paso 3: Subir archivos
**Opción A — Desde la web de GitHub (más fácil):**
1. En tu repo nuevo, click "uploading an existing file"
2. Arrastra TODA la carpeta del proyecto
3. Click "Commit changes"

**Opción B — Desde terminal (si tienes Git instalado):**
```bash
cd ntf-transporte
git init
git add .
git commit -m "NTF Sistema Integral v3"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ntf-transporte.git
git push -u origin main
```

### Paso 4: Conectar con Vercel
1. Ve a https://vercel.com
2. Click "Sign Up" → elige "Continue with GitHub"
3. Autoriza a Vercel
4. Click "Add New..." → "Project"
5. Busca `ntf-transporte` en la lista
6. Click "Import"
7. Framework: **Vite** (se detecta automático)
8. Click **"Deploy"**
9. ¡Espera 60 segundos y listo!

Tu URL será algo como: `https://ntf-transporte.vercel.app`

### Paso 5: Dominio personalizado (opcional)
1. Compra dominio en Namecheap (~$12/año): `transportes-ntf.com`
2. En Vercel → Settings → Domains → agrega tu dominio
3. Configura DNS según las instrucciones de Vercel

---

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## 📁 Estructura del Proyecto

```
ntf-transporte/
├── index.html          # Página principal
├── package.json        # Dependencias
├── vite.config.js      # Config de Vite
├── vercel.json         # Config de deploy
├── .gitignore
├── README.md
└── src/
    ├── main.jsx        # Punto de entrada
    └── App.jsx         # Aplicación completa (44KB)
```

---

## 🔮 Próximos pasos para producción

Para evolucionar a sistema con base de datos real:

1. **Backend**: Node.js + Express en Railway ($5/mes)
2. **Base de datos**: PostgreSQL en Neon.tech (gratis) o Railway
3. **Autenticación**: Auth.js con roles (Admin, Operaciones, Gerencia)
4. **Almacenamiento**: Cloudflare R2 para PDFs/imágenes de facturas
5. **Notificaciones**: WhatsApp API para alertas

**Costo estimado producción**: $12-25/mes

---

© 2026 Negocios y Transportes Fernández SCRL
Desarrollado como sistema de gestión interna
