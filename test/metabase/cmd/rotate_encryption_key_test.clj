(ns metabase.cmd.rotate-encryption-key-test
  (:require [clojure.java.io :as io]
            [clojure.java.jdbc :as jdbc]
            [clojure.test :refer :all]
            [metabase.cmd.load-from-h2 :as load-from-h2]
            [metabase.cmd.rotate-encryption-key :refer [rotate-keys!]]
            [metabase.db.connection :as mdb.connection]
            [metabase.db.spec :as db.spec]
            [metabase.driver :as driver]
            [metabase.models :refer [Database Setting]]
            [metabase.test :as mt]
            [metabase.test.data.interface :as tx]
            [metabase.util.encryption-test :as eu]
            [toucan.db :as db]))

(defn- persistent-jdbcspec
  "Return a jdbc spec for the specified `db-type` on the db `db-name`. In case of H2, makes the connection persistent
  10secs to give us time to fetch the results later."
  [db-type db-name]
  (case db-type
    :h2 {:subprotocol "h2"
         :subname     (format "mem:%s;DB_CLOSE_DELAY=10" db-name)
         :classname   "org.h2.Driver"}
    :postgres (db.spec/postgres (tx/dbdef->connection-details :postgres :db {:database-name db-name}))
    :mysql (db.spec/mysql (tx/dbdef->connection-details :mysql :db {:database-name db-name}))))

(defn- abs-path
  [path]
  (.getAbsolutePath (io/file path)))

(deftest rotate-keys!-test
  (let [h2-fixture-db-file (abs-path "frontend/test/__runner__/test_db_fixture.db")
        h2-file-plaintext (format "/tmp/out-%s.db" (mt/random-name))
        h2-file-enc (format "/tmp/out-%s.db" (mt/random-name))
        h2-file-default-enc (format "/tmp/out-%s.db" (mt/random-name))
        db-name (str "test_" (mt/random-name))
        [k1 k2] ["89ulvIGoiYw6mNELuOoEZphQafnF/zYe+3vT+v70D1A=" "89ulvIGoiYw6mNELuOoEZphQafnF/zYe+3vT+v70D1A="]]
    (mt/test-drivers #{:postgres}
      (binding [mdb.connection/*db-type*   driver/*driver*
                mdb.connection/*jdbc-spec* (persistent-jdbcspec driver/*driver* db-name)
                db/*db-connection* (persistent-jdbcspec driver/*driver* db-name)
                db/*quoting-style* driver/*driver*]
        (when-not (= driver/*driver* :h2)
          (tx/create-db! driver/*driver* {:database-name db-name}))
        (load-from-h2/load-from-h2! h2-fixture-db-file)
        (db/insert! Setting {:key "setting0", :value "val0"})
        (jdbc/query mdb.connection/*jdbc-spec* "select value from setting where key LIKE 'setting%';")

        (eu/with-secret-key k1
          (db/insert! Setting {:key "setting1", :value "val1"})

          (db/update! Database 1 {:details "{\"db\":\"/tmp/test.db\"}"})

          (testing "rotating with the same key is a noop"
            (rotate-keys! k1)
            (is (not (= "val0"
                        (:value (first (jdbc/query mdb.connection/*jdbc-spec* "select value from setting where key LIKE 'setting0';"))))))
            (is (not (= "val1"
                        (:value (first (jdbc/query mdb.connection/*jdbc-spec* "select value from setting where key LIKE 'setting1';"))))))
            (is (= "val0" (:value (first (db/select Setting :key [:= "setting0"])))))
            (is (= "val1" (:value (first (db/select Setting :key [:= "setting1"]))))))

          (testing "rotating with a new key is recoverable"
            (rotate-keys! k2)

            (is (not (= "val0"
                        (:value (first (db/select Setting :key [:= "setting0"]))))))
            ;; (is (not (= "val1"
            ;;             (:value (first (db/select Setting :key [:= "setting1"]))))))

            ;; (eu/with-secret-key k2
            ;;   (is (= "val0"
            ;;          (:value (first (db/select Setting :key [:= "setting0"]))))))
            )




          )))))
